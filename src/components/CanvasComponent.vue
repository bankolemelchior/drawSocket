<template>
    <canvas 
    @mousedown="startDrawing"
    @mousemove="draw"
    @mouseup="stopDrawing"
    @mouseout="stopDrawing"
    ref="canvasRef"
    class="canvas"
    >

    </canvas>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { drawLine } from '@/utils/canvas';
import { useDrawingStore } from '@/stores/useDrawingStore';
const canvasRef = ref<HTMLCanvasElement | null >(null);
const toolbarRef = ref<HTMLDivElement | null >(null);
const lastPoint = ref<{x: number, y: number} | null>(null);
const drawingStore = useDrawingStore();

const resizeCanvas = () => {
    const toolbar = document.querySelector('.toolbar');
    const canvas = canvasRef.value;
    if (!canvas || !toolbar) return;

    canvas.width = window.innerWidth - toolbar.clientWidth;
    canvas.height = window.innerHeight;

}
//Démarrer le dessin
const startDrawing = (e: MouseEvent) => {
    drawingStore.setIsDrawing(true);
    const canvas = canvasRef.value;
    
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();

    console.log(e);

    lastPoint.value = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
    }

    console.log(lastPoint.value)
    
}

//Arrêter le dessin
const stopDrawing = () => {
    drawingStore.setIsDrawing(false);
    lastPoint.value = null
}

//Dessiner
const draw = (e: MouseEvent) => {
    if(!drawingStore.isDrawing) return
    const canvas = canvasRef.value;
    
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');
    
    if(!ctx) return;

    const currentPoint =  {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
    }
    if(!lastPoint.value) return;
    drawLine(ctx, lastPoint.value, currentPoint, drawingStore.color, drawingStore.lineWidth, drawingStore.isEraser);

    
    lastPoint.value = currentPoint;
}

onMounted(() => {
    window.addEventListener('resize', resizeCanvas);

    resizeCanvas();
    const canvas = canvasRef.value;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    
})
</script>