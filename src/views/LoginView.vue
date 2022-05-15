<template>
    <NavigationBar />
    <v-container class="login" align="center">
        <h1>Login</h1>
        <v-row class="error" align="center" justify="center">
            <p v-if="error">Username or password is incorrect.</p>
        </v-row>
        <v-form v-model="valid" @submit.prevent="validate">
            <v-container>
                <v-row>
                    <v-text-field color="#6951FF" clearable variant="outlined" placeholder="username or email" label="username or email" v-model="uid" :counter="100" :rules="[uidRules.required, uidRules.max]" required shaped></v-text-field>
                </v-row>
                <v-row>
                    <v-text-field color="#6951FF" clearable variant="outlined" placeholder="password" label="password" v-model="password" type="password" :counter="100" :rules="[passwordRules.required]" required shaped></v-text-field>
                </v-row>
                <v-row>
                    <button type="submit" align="center" justify="center">login</button>
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
    name: 'LoginView',
    components: {
        NavigationBar,
        FooterComponent
    },
    data: () => {
        return {
            valid: false,
            uid: '',
            uidRules: {
                required: v => !!v || 'Username or email is required',
                max: v => (v && v.length <= 100) || 'Username or email must be less than 100 characters.'
            },
            password: '',
            passwordRules: {
                required: v => !!v || 'Password is required'
            },
            error: ''
        }
    },
    methods: {
        validate: async function() {
            if (this.valid) {
                await this.authenticate();
            }
        },
        authenticate: async function() {
            const user = {
                uid: this.uid,
                password: this.password
            };

            try {
                await this.$store.dispatch("authenticate", user);
                this.$router.push('/dashboard/')
            }
            catch (e) {
                console.clear();
                if (e.response.status == 400) {
                    this.error = true;
                }
            }
        }
    },
    mounted() {
        this.valid = false;
    }
}
</script>

<style lang="scss">
.login {
    border-radius: 10px;
    font-family: 'Roboto Condensed', sans-serif;
    margin-top: 1.5rem;
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
        background-color: #5ED879;
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