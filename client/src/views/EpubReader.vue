<template>
    <div class="container">
      <input type="file" @change="handleFileUpload" accept=".epub" />
      <div class="table-of-contents-toggle">
        <button @click="toggleTableOfContents">
          {{ showTableOfContents ? 'Hide Table of Contents' : 'Show Table of Contents' }}
        </button>
      </div>
      <div class="reader-wrapper">
        <div ref="readerContainer" class="reader-container">
        </div>
      </div>
      <div v-if="showNavigation" class="navigation-buttons">
        <button @click="previousPage">Previous Page</button>
        <button @click="nextPage">Next Page</button>
      </div>
      <div v-if="showTableOfContents" class="table-of-contents">
        <h3>Table of Contents</h3>
        <ul>
          <li v-for="item in tableOfContents" :key="item.id">
            <a href="#" @click="navigateToChapter(item.id)">{{ item.label }}</a>
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  import Epub from 'epubjs'
  
  export default {
    data() {
      return {
        epub: null,
        rendition: null,
        showTableOfContents: false,
        tableOfContents: [],
        showNavigation: false,
      }
    },
    methods: {
      handleFileUpload(event) {
        const file = event.target.files[0]
        this.loadEpub(file)
      },
      loadEpub(file) {
        this.epub = Epub(file)
        this.epub.loaded.navigation.then((toc) => {
          this.tableOfContents = toc.toc
          this.showTableOfContents = true
        })
        this.rendition = this.epub.renderTo(this.$refs.readerContainer, {
          width: '100%',
          height: '100%',
        })
        this.rendition.display()
        this.showNavigation = true
      },
      navigateToChapter(id) {
        console.log('Navigating to chapter with ID:', id)
        this.rendition.display(id)
      },
      previousPage() {
        this.rendition.prev();
      },
      nextPage() {
        this.rendition.next();
      },
      toggleTableOfContents() {
        this.showTableOfContents = !this.showTableOfContents
      },
    },
  }
  </script>
  
  <style scoped>
.container {
  display: flex;
  align-items: flex-start; /* Adjust alignment to top */
  justify-content: center; /* Adjust alignment horizontally */
}

.reader-wrapper {
  position: relative;
  width: 80%;
  height: calc(100vh - 120px);
}

.reader-container {
  width: 100%;
  height: 100%;
}

.table-of-contents {
  width: 20%;
  height: calc(100vh - 120px);
  overflow: auto;
  padding: 10px;
  box-sizing: border-box;
}

.navigation-buttons {
  margin-top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
}


.navigation-buttons button {
  margin: 0 5px; 
}

.table-of-contents-toggle {
  margin-top: 10px;
  display: flex;
  justify-content: center;
}

.table-of-contents-toggle button {
  cursor: pointer;
}
</style>
  

