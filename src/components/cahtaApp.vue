<script setup>
import { ref } from "vue";
const props = defineProps({
  traerRespuesta: Function,
  conversacion: Array,
});

const pregunta = ref("");

const submit = () => {
  let dato = pregunta.value;
  props.traerRespuesta(dato);
  pregunta.value = "";
};
</script>
<template>
  <div class="flex flex-col bg-slate-900 max-h-screen">
    <!-- Encabezado del chat -->
    <div class="bg-gray-800 text-white p-4">
      <h1 class="text-lg font-semibold">Pregunta al Bot 🤖</h1>
    </div>

    <!-- Lista de mensajes -->
    <div class="flex-1 p-4 overflow-y-auto max-h-screen" ref="messageContainer">
      <div v-for="(mensaje, index) in conversacion" :key="index">
        <div class="mb-4">
          <div class="text-left text-slate-700">
            <div
              v-if="mensaje.question"
              class="bg-gray-200 rounded-lg px-4 py-2 inline-block"
            >
              {{ mensaje.question }}
            </div>
          </div>

          <div v-if="mensaje.answer" class="mb-4">
            <div
              class="text-right text-slate-700 animate__animated animate__rubberBand"
            >
              <div
                class="bg-gray-200 rounded-lg px-4 py-2 inline-block w-72 relative"
              >
                <div class="overlay">
                  <span class="font-bold text-2xl text-slate-50"
                    >🤖{{
                      mensaje.answer === "yes"
                        ? "SI"
                        : mensaje.answer === "no"
                        ? "NO"
                        : mensaje.answer === "maybe"
                        ? "TAL VEZ"
                        : mensaje.answer.toUpperCase()
                    }}</span
                  >
                </div>
                <img :src="mensaje.image" :alt="mensaje.answer" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Área de entrada de mensajes -->
    <div class="bg-gray-200 p-4">
      <div class="flex">
        <input
          v-model="pregunta"
          type="text"
          placeholder="Escribe un mensaje..."
          class="flex-1 px-2 py-1 rounded-l-md me-2"
        />
        <button
          @click="submit"
          class="px-4 py-1 bg-gray-800 text-white rounded-l-md"
        >
          Enviar
        </button>
      </div>
    </div>
  </div>
</template>

<style scope>
.relative {
  position: relative;
}
.overlay {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
