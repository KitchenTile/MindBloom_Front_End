<script setup>
import { ref, watch } from 'vue'
import FileConvertor from '../utils/FileConvertor.vue'
import { uploadBook } from '../api/fetchAPI'

const selectedFile = ref(null)
const isConverting = ref(false)
const markdownResult = ref('')
const status = ref('Loading library...')

const handleFileChange = (event) => {
  const file = event.target.files ? event.target.files[0] : null
  selectedFile.value = file
  markdownResult.value = ''
  if (file) {
    status.value = `File selected: ${file.name}. Ready to convert.`
  } else {
    status.value = 'Please select a PDF file.'
  }
}

const startConversion = () => {
  if (selectedFile.value) {
    isConverting.value = true
    status.value = 'Conversion in progress...'
  }
}

const handleLibraryLoad = () => {
  // This event confirms the @opendocsg/pdf2md library is ready to use.
  status.value = ' Select a PDF to upload.'
}

const handleConversionComplete = (markdown) => {
  // This is the successful result event
  markdownResult.value = markdown
  isConverting.value = false
  status.value = 'Conversion complete! See the result below.'
}

const handleConversionError = (errorMessage) => {
  // This handles both library load errors and conversion errors.
  console.error('Conversion Error:', errorMessage)
  isConverting.value = false
  status.value = `Error: ${errorMessage}`
  markdownResult.value = ''
}

const handleUpload = async () => {
  const file = markdownResult.value

  const bookUpload = await uploadBook(file)

  console.log(bookUpload)
}
</script>

<template>
  <main>
    <div>
      <h2>Upload full pdf books to be used by the chatbot</h2>

      <input
        type="file"
        @change="handleFileChange"
        accept="application/pdf"
        :disabled="isConverting"
      />

      <button @click="startConversion" :disabled="!selectedFile || isConverting">
        {{ isConverting ? 'Converting...' : 'Convert to Markdown' }}
      </button>

      <p v-if="status">{{ status }}</p>

      <div v-if="markdownResult">
        <button @click="handleUpload">Upload book</button>
      </div>

      <FileConvertor
        :file="selectedFile"
        :is-converting="isConverting"
        @load="handleLibraryLoad"
        @conversion-complete="handleConversionComplete"
        @error="handleConversionError"
      />
    </div>
  </main>
</template>
