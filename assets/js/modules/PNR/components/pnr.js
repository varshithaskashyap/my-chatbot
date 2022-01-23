const PNR = Vue.component('pnrModule', {
    data: function () {
        return {
            records: [
                {
                    "module":"Introduction",
                    "tag": "bangalore_introduction",
                    "id": 68,
                    "patterns": [
                        "where is bangalore",
                        "bangalore"
                    ],
                    "responses": {
                        "message": [
                            "Bengaluru (also called Bangalore) is the capital of India's southern Karnataka state. The center of India's high-tech industry, the city is also known for its parks and nightlife."
                        ],
                        "video": [
                            "https://www.youtube.com/watch?v=pKIG0dWrQ3I"
                        ],
                        "form": [],
                        "relatedCRT": [
                            "famous_tourist_spots"
                        ]
                    }
                },
                {
                    "module":"Introduction",
                    "tag": "famous_tourist_spots",
                    "id": 69,
                    "patterns": [
                        "Show me famous tourist spots in bangalore",
                        "famous tourist spots",
                        "tourist spots"
                    ],
                    "responses": {
                        "message": [
                            "The famous tourist spots are Nandi Hills, Visvesvaraya Industrial and Technological Museum,Karnataka Chitrakala Parishat and many more."
                        ],
                        "video": [],
                        "form": [],
                        "relatedCRT": []
                    }
                },
            ]
        }
    },

    methods: {
        showRecord(record) {
            let modalDiscription = {
                title : "Detail",
                size : "xl",
                data : record,
                component : "displayPNR"
            }
            this.$root.$emit('showModal',modalDiscription);   
        },
        customizeList() {
            let modalDiscription = {
                title : "Configure Columns - My pending tasks",
                size : "xxl",
                component : "customizePNR"
            }
            this.$root.$emit('showModal',modalDiscription);   
        }
    },  
    template:
    `
    <div class="mt-5">
        <h1 class="text-center">Patterns and Responses</h1>
        <div class="btn-group float-end m-3">
            <button type="button" class="btn btn-primary m-1" @click="customizeList()">Customize</button>
            <router-link to="/add/new" class="btn btn-primary m-1"> New PNR</router-link>

        </div>
        <!--<router-view></router-view>-->
        <table class="table table-hover">
            <thead>
                <tr>
                    <th scope="col">Module</th>
                    <th scope="col">Tag</th>
                    <th scope="col">Pattern</th>
                    <th scope="col">Responses</th>
                    <th scope="col">Options</th>
                </tr>
            </thead>
            <thead>
                <tr>
                    <th scope="col"> <input type="text" id="inputPassword6" class="form-control"
                            aria-describedby="passwordHelpInline">
                    </th>
                    <th scope="col"> <input type="text" id="inputPassword6" class="form-control"
                            aria-describedby="passwordHelpInline">
                    </th>
                    <th scope="col"> <input type="text" id="inputPassword6" class="form-control"
                            aria-describedby="passwordHelpInline">
                    </th>
                    <th scope="col"> <input type="text" id="inputPassword6" class="form-control"
                            aria-describedby="passwordHelpInline">
                    </th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="record in records" :key="record.id" @click="showRecord(record)">
                    <!--<th scope="row">{{ record.id }}</th>-->
                    <th>{{ record.module }}</th>
                    <td>{{ record.tag }}</td>
                    <td></td>
                    <td></td>
                    <td>
                        <i class="m-1 fal fa-edit" aria-hidden="true" v-b-modal></i>
                        <i class="m-1 fal fa-trash-alt" aria-hidden="true" v-b-modal></i>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    `
});