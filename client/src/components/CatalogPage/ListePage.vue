<template>
    <div>
        <select :value = selectedPage @input =updateSelectedPage(parseInt($event.target.value))>
            <option v-for= "i in nbPages" :key="i" :value= i-1 >{{ i }}</option>
        </select>
    </div>
</template>

<script>
export default {
    props: {
        nbPages: {
            type: Number,
            default: 2
        },
        selectedPage: {
            type: Number,
            default: 1
        }
    },
    methods: {
        updateSelectedPage(value) {
            this.$emit('update:selectedPage', value);
        }
    }
    // Autres options du composant
}
</script>
