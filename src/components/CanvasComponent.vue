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
import { useSocketStore } from '@/stores/useSocketStore';
import { useDrawingStore } from '@/stores/useDrawingStore';
const canvasRef = ref<HTMLCanvasElement | null >(null);
const toolbarRef = ref<HTMLDivElement | null >(null);
const lastPoint = ref<{x: number, y: number} | null>(null);
const drawingStore = useDrawingStore();
const socketStore = useSocketStore();

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
    //le client emet l'évenement draw, qui sera écouté par le serveur
    socketStore.sender('draw', {
        points: [lastPoint.value, currentPoint],
        color: drawingStore.color,
        lineWidth: drawingStore.lineWidth,
        isEraser: drawingStore.isEraser
    })
    
    lastPoint.value = currentPoint;
}

onMounted(() => {
    const canvas = canvasRef.value;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if(!ctx) return;
    socketStore.connect();

    //Ecoute de l'évenement serverDraw venant du serveur
    socketStore.socket?.on('serverDraw', ({points, color, lineWidth, isEraser}) => {
        drawLine(ctx, points[0], points[1], color, lineWidth, isEraser);
        
    })
    window.addEventListener('resize', resizeCanvas);
    
    resizeCanvas();
    

    
})
</script>