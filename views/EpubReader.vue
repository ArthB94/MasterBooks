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
  
<!--
.table-of-contents li {
  margin-bottom: 10px;
}

.table-of-contents a {
  text-decoration: none;
  color: #333;
}

.table-of-contents a:hover {
  text-decoration: underline;
}
</style>
-->

<!-- <template>
    <div>
      <input type="file" @change="handleFileUpload" accept=".epub" />
      <div class="reader-container">
        <div ref="prevPageButton" class="page-button prev-page" @click="previousPage">
          <span>Previous Page</span>
        </div>
        <div ref="nextPageButton" class="page-button next-page" @click="nextPage">
          <span>Next Page</span>
        </div>
      </div>
      <div class="table-of-contents-toggle" @click="toggleTableOfContents">
        <button>Show Table of Contents</button>
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
        this.rendition.prevPage()
      },
      nextPage() {
        this.rendition.nextPage()
      },
      toggleTableOfContents() {
        this.showTableOfContents = !this.showTableOfContents
      },
    },
  }
  </script>
  
  <style scoped>
  .reader-container {
    position: relative;
    width: 100%;
    height: calc(100vh - 120px);
  }
  
  .page-button {
    position: absolute;
    top: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    cursor: pointer;
    opacity: 0.8;
    transition: opacity 0.3s;
  }
  
  .page-button:hover {
    opacity: 1;
  }
  
  .prev-page {
    left: 0;
  }
  
  .next-page {
    right: 0;
  }
  
  .table-of-contents-toggle {
    margin-top: 10px;
  }
  
  .table-of-contents-toggle button {
    cursor: pointer;
  }
  
  .table-of-contents {
    margin-top: 10px;
    display: none;
  }
  
  .table-of-contents.show {
    display: block;
  }
  
  .table-of-contents ul {
    list-style-type: none;
    padding: 0;
  }
  
  .table-of-contents li {
    margin-bottom: 10px;
  }
  
  .table-of-contents a {
    text-decoration: none;
    color: #333;
  }
  
  .table-of-contents a:hover {
    text-decoration: underline;
  }
  </style> -->
