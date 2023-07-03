<template>
  <div class="epub-page-container">
    <!-- <input type="file" @change="handleFileUpload" accept=".epub"/> -->
    <div class="back-to-book-link">
      <router-link :to="{ path: 'book-page', query: {ref:$route.query.ref }}" class="to-book-nav" ><font-awesome-icon icon="fa-solid fa-angle-left" class="arrow-left-calendar"/><p>Library</p></router-link>
    
    <div class="table-of-contents-toggle">
      <!-- <button @click="toggleTableOfContents">
        {{ showTableOfContents ? 'Hide Table of Contents' : 'Show Table of Contents' }}
      </button> -->
      <font-awesome-icon icon="fa-solid fa-bars" @click="toggleTableOfContents" style="color:#7a7474; font-size:20px;"/>
    </div></div>
  <div class="epub-container">
    
    <div class="reader-wrapper">
      <div v-if="showNavigation" class="navigation-buttons">
      <font-awesome-icon icon="fa-solid fa-angle-left" class="arrow-left-calendar"
        @click="previousPage" />
      
    </div>
      <div ref="readerContainer" class="reader-container">
      </div>
    
    <div v-if="showNavigation" class="navigation-buttons">    
      <font-awesome-icon icon="fa-solid fa-angle-right" class="arrow-left-calendar"
      @click="nextPage" />
    </div></div>
  
  <div v-if="showTableOfContents" class="table-of-contents">
      <h3>Table of Contents</h3>
      <ul>
        <li v-for="item in tableOfContents" :key="item.id">
          <a href="#" @click="navigateToChapter(item.id)">{{ item.label }}</a>
        </li>
      </ul>
    </div></div>
  </div>
</template>

<script>
import Epub from 'epubjs'

export default {
  data() {
    return {
      file : localStorage.getItem('addressServer') + `/` +this.$route.query.url,
      epub: null,
      rendition: null,
      showTableOfContents: false,
      tableOfContents: [],
      showNavigation: false,
    }
  },
  mounted() {
    console.log(this.file)
    this.epub = Epub(this.file)
    this.epub.loaded.navigation.then((toc) => {
        this.tableOfContents = toc.toc.map((item) => ({
          id: item.href,
          label: item.label,
        }));
        this.showTableOfContents = true
      })
      this.rendition = this.epub.renderTo(this.$refs.readerContainer, {
        width: '100%',
        height: '100%',
      })
      this.rendition.display()
      this.showNavigation = true
  },
  beforeRouteLeave(to, from, next) {
    this.rendition.destroy();
    this.epub.destroy();
    next();
  },


  methods: {
    handleFileUpload(event) {
      const file = event.target.files[0]
      this.loadEpub(file)
    },
    loadEpub(file) {
      this.epub = Epub(file)
      this.epub.loaded.navigation.then((toc) => {
        this.tableOfContents = toc.toc.map((item) => ({
          id: item.href,
          label: item.label,
        }));
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
</style>