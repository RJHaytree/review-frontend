<template>
    <v-col cols="24" lg="12">
        <v-expansion-panel class="stats">
            <v-expansion-panel-title>
                {{ name }}
            </v-expansion-panel-title>
            <v-expansion-panel-text>
                <v-alert type="error" contained v-if="leaderboard.length <= 0">
                    <v-alert-title>Statistics could not be returned.</v-alert-title>
                    <p>{{ error }}</p>
                </v-alert>
                <v-row v-if="leaderboard.length > 0" >
                    <v-card elevation="2" style="width: 100%">
                        <h3>Your position: {{ user.position }}</h3>
                        <v-divider></v-divider>
                        <v-table height="280px">
                            <thead>
                                <tr>
                                    <th>Position</th>
                                    <th>Organisation</th>
                                    <th>Reviews</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="l in leaderboard" :key="l.position">
                                    <td>{{ l.position }}</td>
                                    <td>{{ l.organisation }}</td>
                                    <td>{{ l.count }}</td>
                                </tr>
                            </tbody>
                        </v-table>
                    </v-card>
                </v-row>
            </v-expansion-panel-text>
        </v-expansion-panel>
    </v-col>
</template>

<script>
import axios from 'axios';
import cookie from 'vue-cookies';

let url = 'https://electro-review-api-backend.azurewebsites.net/bi/leaderboard'

export default {
    name: 'LeaderboardComponent',
    props: ['name'],
    data: () => {
        return {
            leaderboard: '',
            error: '',
            user: '',
            showError: false
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
                    this.leaderboard = response.data.success.payload.leaderboard;
                    this.user = response.data.success.payload.user;
                })
            }
            catch (e) {
                this.error = e.message;
                this.showError = true;
            }
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

.v-card {
    margin-top: 1rem;
    margin-bottom: 1rem;
    margin-left: 0.5rem;
    margin-right: 0.5rem;
    padding-top: 1rem;

    h3 {
        padding-left: 0.5rem;
        padding-bottom: 1rem;
    }
}

.v-alert-title, .mdi-close-circle {
    font-size: 1rem;
}

</style>