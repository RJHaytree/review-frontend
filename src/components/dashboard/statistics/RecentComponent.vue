<template>
    <v-col cols="24" lg="12">
        <v-expansion-panel class="stats">
            <v-expansion-panel-title>
                {{ name }}
            </v-expansion-panel-title>
            <v-expansion-panel-text>
                <v-row class="selector">
                    <v-card  style="width: 100%">
                        <v-form @submit.prevent="getData">
                            <v-row>
                                <v-col cols="12">
                                    <v-combobox color="#6951FF" label="timeframe" variant="outlined" :items="timeframeArray" style="width: 100%" clearable v-model="timeframe"></v-combobox>
                                </v-col>
                            </v-row>
                        </v-form>                        
                    </v-card>

                </v-row>
                <v-alert type="error" contained v-if="reviews.length <= 0">
                    <v-alert-title>No statistics returned for the selected timeframe.</v-alert-title>
                    <p>{{ error }}</p>
                </v-alert>
                <v-row class="data">
                    <v-col cols="12" lg="7">
                        <v-card v-if="reviews.length > 0">
                            <p class="scope"><b>Selected Scope:</b> {{ getTimeframe() }}</p>
                            <v-table novalidate="true" height="300px" fixed-header>
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Rating</th>
                                        <th>Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="r in reviews" :key="r.id" @click="select(r.id)">
                                        <td>{{ formatDate(r.date_added) }}</td>
                                        <td>{{ r.rating }}</td>
                                        <td>{{ r.description }}</td>
                                    </tr>
                                </tbody>
                            </v-table>
                        </v-card>                        
                    </v-col>
                    <v-col cols="12" lg="5" class="overview">
                        <v-card v-if="reviews.length > 0">
                            <div v-if="selected <= 0">
                                <p>Select an product from the table to view an overview.</p>
                            </div>
                            <div v-if="selected > 0">
                                <v-row>
                                    <v-col cols="6">
                                        <p><b>Brand: </b> {{ selectedData[0].item.brand }} </p>
                                    </v-col>
                                    <v-col cols="6">
                                        <p><b>Name: </b> {{ selectedData[0].item.name }}</p>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="6">
                                        <p><b>Date Added: </b> {{ formatDate(selectedData[0].date_added) }} </p>
                                    </v-col>
                                    <v-col cols="6">
                                        <p><b>Rating: </b> {{ selectedData[0].rating }}</p>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="12">
                                        <p><b>Description: </b> {{ selectedData[0].description }} </p>
                                    </v-col>
                                </v-row>
                            </div>
                        </v-card>
                    </v-col>
                </v-row>
            </v-expansion-panel-text>
        </v-expansion-panel>
    </v-col>
</template>

<script>
import axios from 'axios';
import cookie from 'vue-cookies';
import moment from 'moment';

let url = 'https://electro-review-api-backend.azurewebsites.net/bi/recent'

export default {
    name: 'RecentComponent',
    props: ['name'],
    data: () => {
        return {
            reviews: '',
            error: '',
            showError: false,
            selected: 0,
            selectedData: '',
            labels: '',
            data: '',
            timeframe: '',
            timeframeArray: ['DAY', 'WEEK', 'MONTH']
        }
    },
    methods: {
        getData: async function() {
            let headers = {
                'Auth-Token': cookie.get('auth-token')
            }

            let timeframe = '';

            if (this.timeframe != '') {
                timeframe = this.timeframe;
            }
            else {
                timeframe = 'MONTH'
            }

            try {
                await axios.post(url, {
                    timeframe: timeframe
                }, {
                    headers: headers
                }).then(response => {
                    this.reviews = response.data.success.payload.reviews;
                    this.data = response.data.success.payload.chartData.datasets;
                    this.labels = response.data.success.payload.chartData.labels;
                })
            }
            catch (e) {
                this.error = e.message;
                this.showError = true;
            }
        },
        formatDate: function(date) {
            let jsDate= new Date(date);
            return moment(jsDate).format('l');
        },
        select: function(id) {
            this.selected = id;
            this.selectedData = this.reviews.filter(d => d.id === id);
        },
        getTimeframe: function() {
            let timeframe = '';

            if (this.timeframe != '') {
                timeframe = this.timeframe;
            }
            else {
                timeframe = 'MONTH'
            }

            return timeframe;
        }
    },
    mounted() {
        this.getData();
    }
}
</script>

<style lang="scss" scoped>

.v-card {
    padding: 1rem;
}

.stats .v-table {
    th, td {
        font-size: 1rem;
    }

    tr td {
        &:hover {
            cursor: pointer;
        }
    }
}

.v-expansion-panel {
    background-color: #f3faf7;
    border: 1px solid #cbf0df;
}

.v-expansion-panel-title {
    font-size: 1.1rem;
    padding: 1.2rem;
}

.v-expansion-panel-text {
    padding: 0.5rem;
    padding-top: 0.8rem;
    padding-bottom: 0.8rem;
}

.v-card {
    padding-top: 0px;
}

.overview {
    .v-table {
        width: 100%;
        border-radius: 4px;
        border: 1px solid rgb(235, 235, 235);
    }

    .v-row {
        padding: 1rem;
    }

    .v-col {
        margin: 0;
        padding: 0;
    }

    .v-card {
        padding-top: 1rem;
    }
}

.v-alert-title, .mdi-close-circle {
    font-size: 1.1rem;
}

.selector {
    margin: 0;

    .v-card {
        padding: 1rem;
        padding-bottom: -2rem;
    }
}

.data {
    margin-top: 1rem;
}

.v-input--horizontal {
    height: 4rem;
}

.scope {
    font-size: 1.1rem;
    padding: 1rem;
    padding-top: 1.5rem;
}
</style>