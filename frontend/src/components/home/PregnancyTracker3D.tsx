
import { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Text } from '@react-three/drei';
import { MathUtils } from 'three';

// Baby model with more realistic features
const BabyModel = ({ week, scale }) => {
  // The color changes based on the development week
  const babyColor = week < 12 ? '#FFD0DB' : week < 24 ? '#FFAABB' : '#FFA0A0';
  
  // Head and body proportions change with development
  const headRadius = scale * (week < 20 ? 0.6 : 0.5); 
  const bodyHeight = scale * (week < 16 ? 0.6 : 0.8);
  const bodyWidth = scale * (week < 16 ? 0.4 : 0.5);
  const bodyDepth = scale * (week < 16 ? 0.3 : 0.4);
  
  return (
    <group position={[0, 0, 0]} rotation={[0, 0, 0]}>
      {/* Head */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[headRadius, 32, 32]} />
        <meshStandardMaterial color={babyColor} roughness={0.7} metalness={0.1} />
      </mesh>
      
      {/* Body - using sphereGeometry with scale instead of ellipsoidGeometry */}
      <mesh position={[0, -scale * 0.6, 0]}>
        <sphereGeometry args={[scale * 0.4, 32, 32]} />
        <meshStandardMaterial color={babyColor} roughness={0.7} metalness={0.1} />
      </mesh>
      
      {/* Arms and legs only appear after week 10 */}
      {week >= 10 && (
        <>
          {/* Left Arm */}
          <mesh position={[-scale * 0.5, -scale * 0.4, 0]} rotation={[0, 0, -Math.PI * 0.2]}>
            <capsuleGeometry args={[scale * 0.1, scale * 0.4, 8, 8]} />
            <meshStandardMaterial color={babyColor} roughness={0.7} metalness={0.1} />
          </mesh>
          
          {/* Right Arm */}
          <mesh position={[scale * 0.5, -scale * 0.4, 0]} rotation={[0, 0, Math.PI * 0.2]}>
            <capsuleGeometry args={[scale * 0.1, scale * 0.4, 8, 8]} />
            <meshStandardMaterial color={babyColor} roughness={0.7} metalness={0.1} />
          </mesh>
        </>
      )}
      
      {/* Legs only appear after week 12 */}
      {week >= 12 && (
        <>
          {/* Left Leg */}
          <mesh position={[-scale * 0.25, -scale * 1.2, 0]} rotation={[0, 0, -Math.PI * 0.1]}>
            <capsuleGeometry args={[scale * 0.12, scale * 0.5, 8, 8]} />
            <meshStandardMaterial color={babyColor} roughness={0.7} metalness={0.1} />
          </mesh>
          
          {/* Right Leg */}
          <mesh position={[scale * 0.25, -scale * 1.2, 0]} rotation={[0, 0, Math.PI * 0.1]}>
            <capsuleGeometry args={[scale * 0.12, scale * 0.5, 8, 8]} />
            <meshStandardMaterial color={babyColor} roughness={0.7} metalness={0.1} />
          </mesh>
        </>
      )}
    </group>
  );
};

// Womb/Placenta environment
const WombEnvironment = ({ week }) => {
  const opacity = MathUtils.clamp(week / 40, 0.2, 0.6);
  // Reduce the womb scale from 1.8 to 1.4 to make the sphere smaller
  const scale = 1.4;
  
  return (
    <mesh position={[0, 0, 0]}>
      <sphereGeometry args={[scale, 32, 32]} />
      <meshStandardMaterial 
        color="#ff8fa3" 
        transparent={true} 
        opacity={opacity} 
        roughness={0.3} 
        metalness={0.2} 
        side={1} // BackSide to see inside
      />
    </mesh>
  );
};

// Animation that slightly moves the baby to simulate floating in amniotic fluid
const FloatingAnimation = ({ children }) => {
  const [rotation, setRotation] = useState(0);
  
  useEffect(() => {
    let animationFrame;
    const animate = () => {
      setRotation(prev => prev + 0.001);
      animationFrame = requestAnimationFrame(animate);
    };
    
    animate();
    return () => cancelAnimationFrame(animationFrame);
  }, []);
  
  return (
    <group 
      rotation={[Math.sin(rotation) * 0.05, rotation, Math.cos(rotation) * 0.05]} 
      position={[Math.sin(rotation * 0.5) * 0.05, Math.cos(rotation * 0.5) * 0.05, 0]}
    >
      {children}
    </group>
  );
};

// Developmental milestone indicators
const DevelopmentalMilestone = ({ week }) => {
  let milestone = "";
  
  if (week <= 8) milestone = "Embryonic development";
  else if (week <= 12) milestone = "Facial features forming";
  else if (week <= 16) milestone = "Movements begin";
  else if (week <= 20) milestone = "Gender may be visible";
  else if (week <= 24) milestone = "Lung development";
  else if (week <= 28) milestone = "Eyes open";
  else if (week <= 32) milestone = "Brain development";
  else if (week <= 36) milestone = "Gaining weight";
  else milestone = "Ready for birth";
  
  return (
    <Text 
      position={[0, -2.2, 0]} 
      fontSize={0.2}
      color="#9b5ed3"
      anchorX="center"
      anchorY="middle"
      maxWidth={2}
      textAlign="center"
    >
      {milestone}
    </Text>
  );
};

// Main component that wraps the 3D scene
const PregnancyTracker3D = () => {
  const [week, setWeek] = useState(12);
  
  // Demo effect to simulate changing weeks
  useEffect(() => {
    const interval = setInterval(() => {
      setWeek((prev) => {
        if (prev >= 40) return 8;
        return prev + 1;
      });
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);

  // Modify the growth curve to make the baby slightly smaller overall
  // Changed from 0.1 + (week / 40) ** 1.5 * 0.9 to 0.08 + (week / 40) ** 1.5 * 0.7
  const babyScale = 0.08 + (week / 40) ** 1.5 * 0.7;

  return (
    <div className="w-full relative my-8 mb-16">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-nurture-100/50 to-mom-100/50 rounded-2xl" />
      
      {/* Increase canvas height to prevent overlapping */}
      <div className="h-[500px] md:h-[600px]">
        <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
          <ambientLight intensity={0.8} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff9db6" />
          <Environment preset="sunset" />
          <OrbitControls 
            enableZoom={false} 
            enablePan={false}
            rotateSpeed={0.5}
            maxPolarAngle={Math.PI / 1.5}
            minPolarAngle={Math.PI / 3}
          />
          
          <WombEnvironment week={week} />
          
          <FloatingAnimation>
            <BabyModel week={week} scale={babyScale} />
          </FloatingAnimation>
          
          <Text 
            position={[0, -1.8, 0]} 
            fontSize={0.3}
            color="#9b5ed3"
            fontWeight="bold"
            anchorX="center"
            anchorY="middle"
          >
            {`Week ${week}`}
          </Text>
          
          <DevelopmentalMilestone week={week} />
        </Canvas>
      </div>
      
      {/* Reposition the text outside of the canvas for better spacing */}
      <div className="text-center mt-4">
        <p className="text-sm text-muted-foreground px-4">
          Visualize your baby's growth throughout pregnancy
        </p>
      </div>
    </div>
  );
};

export default PregnancyTracker3D;
