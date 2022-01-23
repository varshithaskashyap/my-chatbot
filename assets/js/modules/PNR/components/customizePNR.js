Vue.component('customizePNR', {

    data: function () {
        return {
            lists: [
                {
                    id: 1,
                    name: "English PNR",
                    isFav: false,
                    default: true,

                    viewableFields: [
                        { label: "tag", isSelected: true },
                        { label: "id", isSelected: false },
                        { label: "patterns", isSelected: true },
                        { label: "message", isSelected: false },
                        { label: "form", isSelected: true },
                        { label: "relatedCRT", isSelected: false },
                    ],
                    conditions: {
                        all: [],
                        any: []
                    }
                },
                {
                    id: 2,
                    name: "Hindi PNR",
                    isFav: false,
                    default: false,
                    viewableFields: [
                        { label: "tag", isSelected: true },
                        { label: "id", isSelected: true },
                        { label: "patterns", isSelected: true },
                        { label: "message", isSelected: true },
                        { label: "form", isSelected: true },
                        { label: "relatedCRT", isSelected: true },
                    ],
                    conditions: {
                        all: [],
                        any: []
                    }
                },
            ],
            active: 0,
        }
    },

    created() {
        this.$root.$on('customizePNR::list::Delete', (data) => this.deleteList(data));
        // this.$bvToast.toast(`This is toast number`, {
        //     title: 'BootstrapVue Toast',
        //     autoHideDelay: 50000,
        //     appendToast: true
        //   });
          console.log("this ran")
    },

    methods: {
        createList() {
            var newList = {
                name: "",
                isFav: false,
                default: false,
                viewableFields: [
                    { label: "tag", isSelected: true },
                    { label: "id", isSelected: false },
                    { label: "patterns", isSelected: true },
                    { label: "message", isSelected: true },
                    { label: "form", isSelected: true },
                    { label: "relatedCRT", isSelected: true },
                ],
                conditions: {
                    all: [],
                    any: []
                },
            }
            this.lists.push(newList)
            this.$root.$emit('customizePNR::list::Active', newList);
        },
        activeList(list) {
            this.$root.$emit('customizePNR::list::Active', list);
        },

        deleteList(listid) {
            this.lists = this.lists.filter(list => list.id !== listid)
        },
        saveList(list){
            //
        },
    },


    template: `
    <div>
        <div class="row">
            <div class="col-3">
                <h4 class="mb-2">Lists 
                    <span><button type="button" class="btn btn-primary float-end m-1" @click="createList()">+</button></span>
                </h4>
                <input type="text" class="form-control" placeholder="Search Lists" name="email">
                <div>
                    <h5 class="mt-3">My Lists :</h5>
                    <draggable v-model="lists" group="lists" @start="drag=true" @end="drag=false">
                        <div class="m-2 p-2" style="background-color: #e2e3e5;" v-for="list in lists" :key="list.id">
                            <div @mouseover="active = list.id" @mouseleave="active = 0" @click="activeList(list)">
                                <i class="far fa-border-all"></i>
                                <span class="ml-2"v-show="active === list.id">
                                    <i class="fa fa-star" style="color : gold" aria-hidden="true"></i>
                                </span>
                                    {{list.name}}
                                <span v-if="list.default" class="float-end mr-2">
                                    <i class="fa fa-check m-2" aria-hidden="true"></i>
                                </span>
                            </div>
                        </div>
                    </draggable>
                </div>
            </div>
            <div class="col-9 border-start border-5">
                <configureLists :lists=lists></configureLists>
            </div>
        </div>
    </div>
    `,
});

Vue.component('configureLists', {
    props:{
        lists:[]
    },

    data: function () {
        return {
            allFields: [],
            list: {},
            selectedFields: [],
            unselectedFields: [],
            isOptionsOpened: false,
            selected: null,
            search: "",
            isListClicked: false,

            nameState : null,


            // selected: null,
            // options: [
            //     { value: null, text: 'Please select an option' },
            //     { value: 'a', text: 'This is First option' },
            //     { value: 'b', text: 'Selected Option' },
            //     { value: { C: '3PO' }, text: 'This is an option with object value' },
            //     { value: 'd', text: 'This one is disabled', disabled: true }
            // ]
        }
    },

    computed: {
        filteredItems() {
            const condition = new RegExp(this.search, "i");
            return this.unselectedFields.filter(item => item.match(condition));
        }
    },

    created: function () {

        this.$root.$on('customizePNR::list::Active', (data) => {
            this.clearFields();
            this.isListClicked = true;

            // this.list = (Object.keys(data).length !== 0) ? data : this.genreateNewEmptyList();
            this.list = data;


            this.allFields = this.list.viewableFields.map(field => field.label);
            for (let field of this.list.viewableFields) {
                if (field.isSelected) {
                    this.selectedFields.push(field.label)
                } else {
                    this.unselectedFields.push(field.label)
                }
            }
        });
        this.$root.$on('saveList', this.saveList);
    },

    methods: {

        updateMenuStructure() {
            //
        },

        clearFields() {
            this.allFields = []
            this.list = {}
            this.selectedFields = []
            this.unselectedFields = []
            this.isOptionsOpened = false
            this.selected = null
            this.search = ""
        },

        deSelectField(selectedModule) {
            this.selectedFields = this.selectedFields.filter((item) => item.value !== selectedModule.value);
            this.unselectedFields.unshift(selectedModule);
        },

        onInput(value) {
            this.isOptionsOpened = !!value;
            this.selected = null;
        },
        selectField() {
            let selectedOption = this.filteredItems[this.selected];
            this.selectedFields.push(selectedOption)
            this.unselectedFields = this.unselectedFields.filter((item) => item.value !== selectedOption.value);
        },
        onOptionsDown() {
            if (!this.isOptionsOpened)
                return;
            this.selected = (this.selected + 1) % this.filteredItems.length;
        },
        onOptionsUp() {
            if (!this.isOptionsOpened)
                return;
            this.selected = (this.selected - 1 < 0) ? this.filteredItems.length - 1 : this.selected - 1;
        },
        toggleOptions() {
            this.isOptionsOpened = !this.isOptionsOpened;
        },
        onPersanalizeModalClose() {
            //Update the Apps informtaion  in the Menu
            // this.$root.$emit('vds::process::header::app::fields');
        },

        deleteList() {
            self = this
            let modalDiscription = {
                title: "Delete Conformation",
                size: "sm",
                onConform: function () {
                    self.$root.$emit('customizePNR::list::Delete', self.list.id);
                    self.$root.$emit('trigger::notification', {
                        type : "info",
                        delay: 2000,
                        message : "List successfully deleted!"
                    });
                    self.isListClicked = false;
                    self.$root.$emit('bv::hide::modal', 'modal-multi-3');
                }
            }
            this.$root.$emit('modal-multi-3', modalDiscription);
        },

        checkFormValidity() {
            const valid = this.$refs.todoform.checkValidity()
            this.nameState = valid
            return valid
        },

        saveList(){
            if (!this.checkFormValidity()) {
                return
            }
            this.$root.$emit('trigger::notification', {
                type : "success",
                delay: 2000,
                message : "List successfully created!"
            });
        },

    },

    template: 
    `
    <div class="">
        <div v-if="isListClicked">
            <h3 class="text-center">{{list.name}}
                <span class="float-end pr-5" @click="deleteList">
                    <i class="fal fa-trash-alt text-danger m-1" aria-hidden="true"></i>
                </span>
            </h3>

            <form id="myForm" ref="todoform">

                <!-- list Information -->
                <div>
                    <div class="d-flex align-items-center height-40px bg-grey-hue-11 border-0"
                        style="background-color: #EDEFF2">
                        <h5 class="mb-0 p-2 pl-3 font-13 f-500 mt-5">
                            <span>List Information</span>
                        </h5>
                    </div>

                    <div class="row g-3 align-items-center mt-3">
                        <b-form-group label="List Name :" label-for="listname" invalid-feedback="List name is required"
                            :state="nameState">
                            <b-form-input id="listname" v-model="list.name" :state="nameState" required></b-form-input>
                        </b-form-group>
                    </div>
                    <!--<div class="row g-3 align-items-center mt-1">
                    <div class="col-6">
                        <label for="listname" class="col-form-label">Default Sort Column:</label>
                        <b-form-select class="form-select" v-model="selected" :options="options"></b-form-select>
                    </div>
                    <div class="col-6">
                        <label for="listname" class="col-form-label">Default Sort Order::</label>
                        <b-form-select class="form-select" v-model="selected" :options="options"></b-form-select>
                    </div>
                </div>-->
                </div>


                <!-- list Conditons -->
                <div>
                    <div class="d-flex align-items-center height-40px bg-grey-hue-11 border-0"
                        style="background-color: #EDEFF2">
                        <h5 class="mb-0 p-2 pl-3 font-13 f-500 mt-5">
                            <span>List Conditions</span>
                        </h5>
                    </div>

                    <div class="pl-2 pr-4">
                        <div name="allConditionContainer" class="p-2"><span class="font-13 text-dark-0">All
                                Conditions</span>
                            &nbsp;(
                            <span>All conditions must be met</span>
                            )
                            <div class="mt-2">
                                <div class="d-flex flex-column"></div> <button id="addFilterCondition"
                                    class="btn btn-primary bg-grey-hue-9 text-dark-0 shadow-none font-12"><span
                                        class="fa fa-plus text-dark-0 font-12 mr-1"></span>Add Condition</button>
                            </div>
                        </div>
                        <div name="anyConditionContainer" class="p-2"><span class="font-13 text-dark-0">Any
                                Conditions</span>
                            &nbsp;(
                            <span>At least one of the conditions must be met</span>
                            )
                            <div class="mt-2">
                                <div class="d-flex flex-column"></div> <button id="addFilterCondition"
                                    class="btn btn-primary bg-grey-hue-9 text-dark-0 shadow-none font-12"><span
                                        class="fa fa-plus text-dark-0 font-12 mr-1"></span>Add Condition</button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Choose columns and order -->
                <div>
                    <div class="d-flex align-items-center height-40px bg-grey-hue-11 border-0"
                        style="background-color: #EDEFF2">
                        <h5 class="mb-0 p-2 pl-3 font-13 f-500 mt-5">
                            <span>Choose Columns</span>
                        </h5>
                    </div>

                    <!--<input v-model="list.name" placeholder="List Name">-->

                    <div class="p-2 pl-3">
                        <div class="form-inline has-search pl-0 w-50">
                            <p class="control icon-right">
                                <input type="text" class="form-control w-100 h-100 rounded border-grey-1"
                                    placeholder="Search labels" @input="onInput($event.target.value)"
                                    @blur="isOptionsOpened = false" @keyup.enter="selectField" @keyup.tab="selectField"
                                    @keydown.down="onOptionsDown" @keydown.up="onOptionsUp" @keyup.esc="isOpen = false"
                                    @click="toggleOptions" ref="dropdown" v-model="search" />
                            </p>

                            <transition name="fade" mode="in-out">
                                <ul v-show="isOptionsOpened" style="list-style-type: none;
                                padding:2px;
                                margin: 0;
                                border: 1px solid #dbdbdb;
                                border-radius: 0 0 3px 3px;
                                max-height: 200px;
                                overflow-y: auto;">

                                    <div
                                        class="form-inline d-flex listColumns d-flex scrollbar scrollbar-default justify-content-around row mb-0 mr-1 bg-white pl-2">
                                        <span v-for="(field,i) in filteredItems" @mouseenter="selected = i"
                                            @mousedown="selectField" :class="{'selected': i === selected}">
                                            <div class="listFieldOption py-1 my-1 bg-grey-hue-9 rounded-4 c-pointer pl-3"
                                                style="width: 200px !important;">
                                                <div class="">{{field}}</div>
                                        </span>
                                    </div>
                                </ul>
                            </transition>
                        </div>
                    </div>
                </div>
                <draggable v-model="selectedFields" group="people" @start="drag=true" @end="drag=false"
                    :options="{disabled : false}">
                    <div class="m-2 p-2 customize-pnr" v-for="element in selectedFields" :key="1">
                        <i class="far fa-border-all"></i>
                        {{element}}
                        <span class="float-end mr-2">
                            <i class="fal fa-trash-alt text-danger" aria-hidden="true"></i>
                        </span>
                    </div>
                </draggable>
            </form>
        </div>
        <div v-else>
            <h2 class="text-center">List will come here</h2>
        </div>
    </div>

    `,
});

