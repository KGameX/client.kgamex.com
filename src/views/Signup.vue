<template>
    <div class="center-container auth-container">
        <title>{{ t('auth.tab-title') }}</title>

        <section>
            <h4>{{ t('auth.title') }}</h4>

            <form @submit.prevent="signup">
                <div>
                    <input v-model="username" id="username-textbox" name="username-textbox" class="textbox" :placeholder="t('auth.signup.username')" maxlength="20" required />
                </div>

                <p class="footnote">{{ t('auth.signup.hint.username') }}</p>

                <p class="danger" v-if="userStore.usernameExistsError">{{ t('auth.signup.error.usernameExists') }}</p>

                <div>
                    <input v-model="email" id="email-textbox" name="email-textbox" class="textbox" type="email" :placeholder="t('auth.signup.email')" />
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

                <p class="danger" v-if="userStore.updateError">{{ t('account.management.update-error') }}</p>

                <button @click="signup" :disabled="!(username && displayName && password && confirmPassword && (password === confirmPassword) && (!userStore.submitted) && password.length >= 8 && username.length >= 5 && /^[a-z0-9_]+$/.test(username))">{{ t('auth.signup.button') }}</button>
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
userStore.resetFlags()

const username = ref('')
const email = ref('')
const displayName = ref('')
const password = ref('')
const confirmPassword = ref('')

function signup() {
    if (!userStore.submitted) {
        userStore.signup({ username: username.value, email: email.value ? email.value : null, displayName: displayName.value, password: password.value })
    }
}
</script>