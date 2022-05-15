<template>
    <v-col cols="24" lg="12">
        <v-expansion-panel class="stats">
            <v-expansion-panel-title>
                {{ name }}
            </v-expansion-panel-title>
            <v-expansion-panel-text>
                <v-alert type="error" contained v-if="data.length <= 0">
                    <v-alert-title>Statistics could not be returned.</v-alert-title>
                    <p>{{ error }}</p>
                </v-alert>
                <v-row v-if="data.length > 0">
                    <v-col cols="12" lg="7">
                        <v-card elevation="2">
                            <v-table fixed-header height="300px">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Product</th>
                                        <th>Average Rating</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="row in data" :key="row.id" @click="select(row.id)">
                                        <td>{{ row.id }}</td>
                                        <td>{{ row.name }}</td>
                                        <td>{{ row.average_rating }}</td>
                                    </tr>
                                </tbody>
                            </v-table>
                        </v-card>
                    </v-col>
                    <v-col cols="12" lg="5" class="overview">
                        <v-card style="height: 100%" elevation="2">
                            <div v-if="selected <= 0">
                                <p>Select an product from the table to view an overview.</p>
                            </div>
                            <div v-if="selected > 0">
                                <v-row>
                                    <p><b>Name: </b> {{ selectedData[0].name }} </p>
                                </v-row>
                                <v-row>
                                    <v-col cols="6">
                                        <p><b>Average: </b> {{ selectedData[0].average_rating }} </p>
                                    </v-col>
                                    <v-col cols="6">
                                        <p><b>Count: </b> {{ selectedData[0].review_count }}</p>
                                    </v-col>
                                </v-row>
                                <v-row justify="bottom">
                                    <v-table height="180px">
                                        <thead>
                                            <tr>
                                                <th>Rating</th>
                                                <th>Description</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="review in selectedData[0].reviews" :key="review.id">
                                                <td>{{ review.rating }}</td>
                                                <td>{{ review.description }}</td>
                                            </tr>
                                        </tbody>
                                    </v-table>
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

let url = 'https://electro-review-api-backend.azurewebsites.net/bi/highest/avg/local'

export default {
    name: 'HighestAvgLocalComponent',
    props: ['name'],
    data: () => {
        return {
            data: '',
            error: '',
            showError: false,
            selected: 0,
            selectedData: ''
        }
    },
    methods: {
        getData: async function() {
            let headers = {
                'Auth-Token': cookie.get('auth-token')
            }

            try {
                await axios.get(url, {
                    headers: headers
                }).then(response => {
                    this.data = response.data.success.payload;
                })
            }
            catch (e) {
                this.error = e.message;
                this.showError = true;
            }
        },
        select: function(id) {
            this.selected = id;
            this.selectedData = this.data.filter(d => d.id === id);
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
    background-color: #fafcff;
    border: 1px solid #b6daff;
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

</style>