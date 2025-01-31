<template>
    <canvas 
    @mousedown="startDrawing"
    @mousemove="draw"
    ref="canvasRef"
    class="border-2 border-red-500"
    >

    </canvas>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
const canvasRef = ref<HTMLCanvasElement | null >(null);
const toolbarRef = ref<HTMLDivElement | null >(null);
const lastPoint = ref<{x: number, y: number} | null>(null);


const resizeCanvas = () => {
    const toolbar = document.querySelector('.toolbar');
    const canvas = canvasRef.value;
    if (!canvas || !toolbar) return;

    canvas.width = window.innerWidth - toolbar.clientWidth;
    canvas.height = window.innerHeight;

}
//Démarrer le dessin
const startDrawing = (e: MouseEvent) => {
    console.log(e);

    lastPoint.value = {
        x: e.clientX,
        y: e.clientY
    }

    console.log(lastPoint.value);
    
    
}

//Dessiner
const draw = (e: MouseEvent) => {
    const canvas = canvasRef.value;
    
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');
    
    const currentPoint =  {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
    }
    if(!lastPoint.value) return;
    
    ctx.beginPath();
    ctx.strokeStyle = "red";
    ctx.moveTo(lastPoint.value.x, lastPoint.value.y);
    ctx.lineTo(currentPoint.x, currentPoint.y);
    ctx.stroke();
    
}

onMounted(() => {
    resizeCanvas();
    const canvas = canvasRef.value;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    
})
</script>