import { ParticleSystem } from "cc";

export function delay(delay: number){
    return new Promise((resolve) => setTimeout(resolve, delay));
}

export function playParticleSystemRecursively(particle : ParticleSystem){
    let child : ParticleSystem[] = particle.node.children.map(child => child.getComponent(ParticleSystem));
    particle.play();
    for(let c of child){
        c.play();
    }
}