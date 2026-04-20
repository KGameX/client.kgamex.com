<template>
    <div class="center-container auth-container">
        <section>
            <h4>{{ t('auth.title') }}</h4>

            <form @submit.prevent="signup">
                <div>
                    <input v-model="username" id="username-textbox" name="username-textbox" class="textbox" :placeholder="t('auth.signup.username')" maxlength="20" required />
                </div>

                <p class="footnote">{{ t('auth.signup.hint.username') }}</p>

                <p class="danger" v-if="userStore.usernameExistsError">{{ t('auth.signup.error.usernameExists') }}</p>

                <div>
                    <input v-model="email" id="email-textbox" name="email-textbox" class="textbox" type="email" :placeholder="t('auth.signup.email')" required />
                </div>

                <p class="danger" v-if="userStore.emailExistsError">{{ t('auth.signup.error.emailExists') }}</p>

                <div>
                    <input v-model="displayName" id="display-name-textbox" name="display-name-textbox" class="textbox" :placeholder="t('auth.signup.display-name')" required />
                </div>

                <div>
                    <input v-model="password" id="password-textbox" name="password-textbox" class="textbox" type="password" :placeholder="t('auth.signup.password')" minlength="8" required />
                </div>

                <div>
                    <input v-model="confirmPassword" id="confirm-password-textbox" name="confirm-password-textbox" class="textbox" type="password" :placeholder="t('auth.signup.confirm-password')" minlength="8" required />
                </div>

                <p class="danger" v-if="userStore.signupError">{{ t('auth.signup.error.default') }}</p>

                <button @click="signup" :disabled="!(username && email && displayName && password && confirmPassword && (password === confirmPassword) && (!submitted || userStore.signupError) && password.length >= 8 && username.length >= 5 && /^[a-z0-9_]+$/.test(username))">{{ t('auth.signup.button') }}</button>
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

if (userStore.user) {
    window.location.href = '/'
}

const username = ref('')
const email = ref('')
const displayName = ref('')
const password = ref('')
const confirmPassword = ref('')
const submitted = ref(false)

function signup() {
    if (!submitted.value || userStore.signupError) {
        submitted.value = true
        userStore.signup({ username: username.value, email: email.value, displayName: displayName.value, password: password.value })
    }
}
</script>