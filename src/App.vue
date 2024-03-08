<script setup>
import { ref, onMounted } from "vue";
import responseFunction from "./helpers/apiYesNo";
import cahtaApp from "./components/cahtaApp.vue";

const respuesta = ref("");
const loading = ref(true);
const conversacion = ref([]);
const preguntasInvalidas = [
  "cómo",
  "como",
  "porque",
  "porqué",
  "donde",
  "dónde",
  "cuando",
  "cuándo",
  "quien",
  "quién",
  "que",
  "qué",
];

const traerRespuesta = async (pregunta) => {
  let validar = true;

  if (pregunta.length > 0) {
    for (let i = 0; i < pregunta.length; i++) {
      if (pregunta.toLowerCase().includes(preguntasInvalidas[i])) {
        validar = false;
      }
    }

    conversacion.value.push({
      question: pregunta,
      answer: "",
      image: null,
    });

    if (pregunta.at(-1) == "?" && validar) {
      respuesta.value = await responseFunction();
      loading.value = false;
      conversacion.value = [
        ...conversacion.value,
        { answer: respuesta.value.answer, image: respuesta.value.image },
      ];
    } else {
      loading.value = false;
      setTimeout(() => {
        conversacion.value = [
          ...conversacion.value,
          {
            answer: "No entiendo",
            image:
              "https://www.pngkit.com/png/full/10-105264_thinking-smiley-face-png-picture-royalty-free-stock.png",
          },
        ];
      }, 2000);
    }
  }
};
</script>

<template>
  <cahtaApp :traerRespuesta="traerRespuesta" :conversacion="conversacion" />
</template>

<style scoped></style>
