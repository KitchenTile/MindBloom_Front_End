<script setup>
import { ref, watch, onMounted } from 'vue'

// Define the props equivalent to the React interface
const props = defineProps({
  file: {
    type: File,
    default: null,
  },
  isConverting: {
    type: Boolean,
    required: true,
  },
})

// Define the emits equivalent to the React callback props
const emit = defineEmits(['load', 'conversionComplete', 'error'])

// State for the loaded pdf2md library function
const pdf2md = ref(null)

// == Load the pdf2md library (Equivalent to React's first useEffect) ==
onMounted(() => {
  const loadPdf2md = async () => {
    try {
      // Dynamic import of the pdf2md library
      const pdf2mdModule = await import('@opendocsg/pdf2md')
      // The imported module might be wrapped in a default export
      pdf2md.value = pdf2mdModule.default
      emit('load')
    } catch (error) {
      console.error('Failed to load pdf2md library:', error)
      emit('error', 'Failed to load conversion library. Please try again later.')
    }
  }

  loadPdf2md()
})

// == Handle the conversion when triggered (Equivalent to React's second useEffect) ==
watch(
  [() => props.file, pdf2md, () => props.isConverting],
  ([newFile, newPdf2md, newIsConverting]) => {
    const convertPdf = async () => {
      // Check for necessary conditions
      if (!newFile || !newPdf2md || !newIsConverting) return

      try {
        // Convert the file to an ArrayBuffer
        const pdfBuffer = await newFile.arrayBuffer()

        // Convert PDF to Markdown using pdf2md
        const markdown = await newPdf2md(pdfBuffer)

        // Return the result
        emit('conversionComplete', markdown)
      } catch (error) {
        console.error('Error converting PDF:', error)
        emit('error', 'Failed to convert PDF. The file might be corrupted or unsupported.')
      }
    }

    if (newIsConverting && newFile && newPdf2md) {
      convertPdf()
    }
  },
  { immediate: true },
) // Use immediate: true to check initial state

// This component doesn't render anything visible, so the template is minimal
</script>

<template>
  <slot></slot>
</template>
