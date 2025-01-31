<template>
    <div class="toolbar bg-white rounded-lg shadow-lg p-4 space-y-4">
        <div class="flex gap-2 justify-center">
            <button title="Pinceau" class="cursor-pointer">
                <Paintbrush :size="20" />
            </button>
            <button title="Gomme" class="cursor-pointer">
                <Eraser :size="20" />
            </button>
        </div>

        <div class="space-y-2">
            <label for=""
            class="text-sm text-gray-700 font-medium block"
            >
            Couleur
        </label>
            <input type="color" name="" id="" class="w-full">
        </div>

        <div class="space-y-2">
            <label 
            for=""
            class="text-sm text-gray-700 font-medium block"
            >Epaisseur</label>
            <input 
            type="range" 
            min="1"
            max="50"
            id=""
            class="w-full"
            >
        </div>

        <div class="flex flex-col gap-2">
            <button class="flex gap-2 justify-center items-center bg-red-200 text-red-600 rounded-md px-3 py-2 cursor-pointer">
                <RotateCcw 
                :size="20" 
                />
                Nettoyer
            </button>

            <button class="flex gap-2 justify-center items-center  bg-blue-200 text-blue-600 rounded-md px-3 py-2 cursor-pointer">
                <Download :size="20" />
                Enregistrer
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import {Paintbrush, Eraser, RotateCcw, Download} from 'lucide-vue-next';


</script>