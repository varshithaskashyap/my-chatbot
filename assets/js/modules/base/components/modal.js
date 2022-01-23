Vue.component('modal', {
    data() {
        return {
            title : String,
            size : String,
            data : Object,
            component : String,
            class : "modal-fullscreen",
        }
    },
    created() {
        this.$root.$on('showModal', (modalDiscription)=> {
            this.title = modalDiscription.title
            this.size = modalDiscription.size
            this.data = modalDiscription.data
            this.component = modalDiscription.component;

            this.$root.$emit('bv::show::modal','showModal' );  
        });        
    },
    methods: {

        handleOk() {
            this.$root.$emit('saveList');  
        },
    },

    template : `
    <div class="modalContainer">
        <b-modal id="showModal" hide-backdrop content-class="shadow" :size=size  :title=title ok-title="Save" @ok.prevent="handleOk" scrollable>
            <component :is="component" ref="a" :data=data ></component>
        </b-modal>
    </div>`
});
// @ok.prevent="handleOk"