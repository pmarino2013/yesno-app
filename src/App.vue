<script setup>
import { ref } from "vue";
import responseFunction from "./helpers/apiYesNo";
import cahtaApp from "./components/cahtaApp.vue";
import homer from "./assets/homer.gif";

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
      if (pregunta.trim().toLowerCase().includes(preguntasInvalidas[i])) {
        validar = false;
      }
    }

    conversacion.value.push({
      question: pregunta.trim(),
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
            image: homer,
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
