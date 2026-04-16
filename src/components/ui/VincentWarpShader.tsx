"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useMemo, useRef } from "react";

/**
 * Vincent Warp Shader — radial speed-lines effect recolored to the
 * Noche Estrellada palette (deep indigo → cobalt → star gold → cream).
 *
 * Meant as a background layer in the Hero, rendered at low opacity
 * via CSS so it doesn't compete with the headline + starfield.
 */

function FullscreenShader() {
  const shaderRef = useRef<THREE.ShaderMaterial>(null!);
  const { size, gl } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uResolution: {
        value: new THREE.Vector3(size.width, size.height, 1),
      },
    }),
    [size.width, size.height],
  );

  useFrame(({ clock }) => {
    if (!shaderRef.current) return;
    shaderRef.current.uniforms.uTime.value = clock.getElapsedTime();
    const buf = new THREE.Vector2();
    (gl as THREE.WebGLRenderer).getDrawingBufferSize(buf);
    shaderRef.current.uniforms.uResolution.value.set(buf.x, buf.y, 1);
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={shaderRef}
        depthWrite={false}
        depthTest={false}
        transparent={false}
        uniforms={uniforms}
        vertexShader={`
          varying vec2 vTexCoord;
          void main() {
            vTexCoord = uv;
            gl_Position = vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          precision highp float;

          uniform vec3 uResolution;
          uniform float uTime;

          float randVal(vec2 p) {
            return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
          }

          float noise2d(vec2 p) {
            vec2 i = floor(p);
            vec2 f = fract(p);
            vec2 u = f * f * (3.0 - 2.0 * f);
            float a = randVal(i);
            float b = randVal(i + vec2(1.0, 0.0));
            float c = randVal(i + vec2(0.0, 1.0));
            float d = randVal(i + vec2(1.0, 1.0));
            return (a + (b - a) * u.x + (c - a) * u.y + (a - b - c + d) * u.x * u.y) / 4.0;
          }

          float mirrored(float t, float shift) {
            t = fract(t + shift);
            return 2.0 * abs(t - 0.5);
          }

          float radialLayer(float angle, float radius) {
            const float SCALE = 45.0;
            radius = pow(radius, 0.01);
            float offset = -uTime * 0.04;
            vec2 pos = vec2(mirrored(angle, 0.1), radius + offset);
            float n1 = noise2d(pos * SCALE);
            pos = 2.1 * vec2(mirrored(angle, 0.4), radius + offset);
            float n2 = noise2d(pos * SCALE);
            pos = 3.7 * vec2(mirrored(angle, 0.8), radius + offset);
            float n3 = noise2d(pos * SCALE);
            pos = 5.8 * vec2(mirrored(angle, 0.0), radius + offset);
            float n4 = noise2d(pos * SCALE);
            return pow((n1 + 0.5 * n2 + 0.25 * n3 + 0.125 * n4) * 3.0, 1.0);
          }

          // Vincent palette: deep indigo → cobalt → star gold → cream
          vec3 applyColor(float v) {
            v = clamp(v, 0.0, 1.0);
            // Base: deep indigo (#0B1E38) to cobalt (#2D4E8E)
            vec3 col = mix(vec3(0.043, 0.118, 0.22), vec3(0.176, 0.306, 0.557), v);
            // Mid: cobalt to star gold (#E8B931)
            col = mix(col, vec3(0.91, 0.725, 0.192), smoothstep(0.35, 0.7, v));
            // Hot: gold to cream (#F5F0E1) for the brightest streaks
            col = mix(col, vec3(0.96, 0.94, 0.882), smoothstep(0.7, 1.0, v));
            // Amplify brightness slightly for presence
            col *= v * 1.4;
            col = max(col, vec3(0.0));
            return col;
          }

          void main() {
            vec2 uv = (gl_FragCoord.xy * 2.0 - uResolution.xy) / uResolution.y * 0.5;
            float dist = dot(uv, uv);
            float ang = atan(uv.y, uv.x) / 6.28318530718;
            float val = radialLayer(ang, dist);
            val = val * 2.5 - 1.4;
            val = mix(0.0, val, 0.8 * smoothstep(0.0, 0.8, dist));
            gl_FragColor = vec4(applyColor(val), 1.0);
          }
        `}
      />
    </mesh>
  );
}

export default function VincentWarpShader({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div className={className}>
      <Canvas
        orthographic
        camera={{ position: [0, 0, 1], zoom: 1 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: false }}
        style={{ width: "100%", height: "100%" }}
      >
        <color attach="background" args={["#0B1E38"]} />
        <FullscreenShader />
      </Canvas>
    </div>
  );
}
