<template>
    <NavigationBar />
    <v-container class="register" align="center">
        <h1>Register</h1>
        <v-row class="error" align="center" justify="center">
            <p v-if="error">Username or password is incorrect.</p>
        </v-row>
        <v-form v-model="valid" @submit.prevent="validate">
            <v-container>
                <v-row>
                    <v-text-field color="#6951FF" clearable variant="outlined" placeholder="username" label="username" v-model="username" :counter="100" :rules="[usernameRules.required, usernameRules.max]" required shaped></v-text-field>
                </v-row>
                <v-row>
                    <v-text-field color="#6951FF" clearable variant="outlined" placeholder="password" label="password" v-model="password" type="password" :counter="100" :rules="[passwordRules.required]" required shaped></v-text-field>
                </v-row>
                <v-row>
                    <v-text-field color="#6951FF" clearable variant="outlined" placeholder="confirm password" label="confirm password" v-model="confirmPassword" type="password" :counter="100" :rules="confirmPasswordRules.concat(confirmPasswordMatch)" required shaped></v-text-field>
                </v-row>
                <v-row>
                    <v-text-field color="#6951FF" clearable variant="outlined" placeholder="email" label="email" v-model="email" :counter="100" type="email" :rules="emailRules.concat(confirmEmail)"></v-text-field>
                </v-row>
                <v-row>
                    <v-text-field color="#6951FF" clearable variant="outlined" placeholder="organisation" label="organisation" v-model="organisation" :counter="100" :rules="organisationRules"></v-text-field>
                </v-row>
                <v-row>
                    <button type="submit" align="center" justify="center">register</button>
                </v-row>
            </v-container>
        </v-form>
    </v-container>
    <FooterComponent />
</template>

<script>
import NavigationBar from '../components/NavigationBar';
import FooterComponent from '../components/home/FooterComponent';

export default {
    name: 'RegisterView',
    components: {
        NavigationBar,
        FooterComponent
    },
    data: () => {
        return {
            valid: false,
            username: '',
            usernameRules: {
                required: v => !!v || 'Username or email is required',
                max: v => (v && v.length <= 50) || 'Username must be less than 100 characters.'
            },
            password: '',
            passwordRules: {
                required: v => !!v || 'Password is required'
            },
            confirmPassword:'',
            confirmPasswordRules: [
                v => !!v || 'Password is required'
            ],
            email: '',
            emailRules: [
                v => !!v || 'Email is required',
                v => (v && v.length <= 100) || 'Email must be less than 100 characters'
            ],
            organisation: '',
            organisationRules: [
                v => !!v || 'Organisation is required',
                v => (v && v.length < 100) || 'Organisation must be less than 100 characters'
            ],
            error: ''
        }
    },
    methods: {
        validate: async function() {
            if (this.valid) {
                await this.register();
            }
        },
        confirmPasswordMatch: function(value) {
            return value == this.password || 'Passwords do not match';
        },
        confirmEmail: function(value) {
            const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return regex.test(value) || 'Email is invalid'
        },
        register: async function() {
            const user = {
                username: this.username,
                password: this.password,
                email: this.email,
                organisation: this.organisation
            };

            try {
                await this.$store.dispatch("register", user);

                this.$router.push('/login')
            }
            catch (e) {
                console.log(e.response);
                this.error = true;
            }
        }
    },
    mounted() {
        this.valid = false;
    }
}
</script>

<style lang="scss">
.register {
    border-radius: 10px;
    font-family: 'Roboto Condensed', sans-serif;
    margin-top: 8rem;
    max-width: 600px;
    background-color: #ffffff;
    padding: 4rem;
    margin-bottom: 20rem;

    h1 {
        margin-top: 2rem;
        margin-bottom: 3rem;
    }

    .label {
        margin-bottom: 1rem;
        color: #7C7C7C;
    }

    button {
        width: 100%;
        padding: 1rem;
        border-radius: 0.3rem;
        background-color: #6951FF;
        font-size: 1.2rem;
        margin-top: 1rem;
        color: #ffffff;

        &:hover {
            background-color: #57CA70;
        }
    }

    .error {
        height: 2rem;
        color: rgb(196, 45, 45);
        margin-bottom: 1rem;
        font-size: 1.2rem;
    }
}

.v-field {
    border: 0 !important;
}

.v-field__overlay {
    background-color: #ffffff !important;
}

.v-input--is-focused {
    border: 0;
}
</style>