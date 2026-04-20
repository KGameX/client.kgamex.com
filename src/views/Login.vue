<template>
    <div class="center-container auth-container">
        <section>
            <h4>{{ t('auth.title') }}</h4>

            <form @submit.prevent="login">
                <div>
                    <input v-model="userlogin" id="login-textbox" name="login-textbox" class="textbox" :placeholder="t('auth.login.login')" required />
                </div>

                <div>
                    <input v-model="password" id="password-textbox" name="password-textbox" class="textbox" type="password" :placeholder="t('auth.login.password')" minlength="8" required />
                </div>

                <p class="danger" v-if="userStore.loginError">{{ t('auth.login.error') }}</p>

                <button @click="login" :disabled="!(userlogin && password && (!submitted || userStore.loginError))">{{ t('auth.login.button') }}</button>

                <router-link to="/sign-up">
                    <p>{{ t('auth.login.no-account') }}</p>
                </router-link>
            </form>
        </section>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import useUserStore from '@/stores/user'

const { t } = useI18n()
const userStore = useUserStore()

userStore.redirectIfAuthenticated()

const userlogin = ref('')
const password = ref('')
const submitted = ref(false)

function login() {
    if (!submitted.value || userStore.loginError) {
        submitted.value = true
        userStore.login({ login: userlogin.value, password: password.value })
    }
}
</script>