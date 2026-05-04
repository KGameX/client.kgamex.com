<template>
    <div class="center-container auth-container">
        <title>{{ t('account.management.tab-title') }} | KGΛMΞX</title>

        <section>
            <h4>{{ userStore.user.display_name }}</h4>

            <form @submit.prevent="updateAccount">
                <div>
                    <input v-model="username" id="username-textbox" name="username-textbox" class="textbox" :placeholder="t('account.management.form.new-username')" maxlength="20" />
                </div>

                <p class="danger" v-if="userStore.usernameExistsError">{{ t('auth.signup.error.usernameExists') }}</p>

                <div>
                    <input v-model="email" id="email-textbox" name="email-textbox" class="textbox" type="email" :placeholder="t('account.management.form.new-email')" />
                </div>

                <p class="danger" v-if="userStore.emailExistsError">{{ t('auth.signup.error.emailExists') }}</p>

                <div>
                    <input v-model="displayName" id="display-name-textbox" name="display-name-textbox" class="textbox" :placeholder="t('account.management.form.new-display-name')" />
                </div>

                <p class="footnote">{{ t('account.management.form.hint') }}</p>
                
                <p class="success" v-if="userStore.updateSuccess">{{ t('account.management.update-success') }}</p>
                
                <p class="danger" v-if="userStore.updateError">{{ t('account.management.update-error') }}</p>

                <div class="flex">
                    <button @click="updateAccount" :disabled="!(username || email || displayName)">{{ t('account.management.form.button') }}</button>

                    <span class="button" @click="userStore.removeEmail()">{{ t('account.management.form.remove-email') }}</span>
                </div>
            </form>

            <p class="flex">
                <router-link to="/logout">
                    <span class="button">{{ t('account.management.logout') }}</span>
                </router-link>
                <span class="button" @click="confirmDelete = true">{{ t('account.management.delete-account') }}</span>
            </p>

            <p v-if="confirmDelete" class="danger">{{ t('account.management.delete-confirmation') }}</p>
            
            <p class="flex" v-if="confirmDelete">
                <span class="button" @click="confirmDelete = false; userStore.deleteAccount()">{{ t('buttons.confirm') }}</span>
                
                <span class="button" @click="confirmDelete = false">{{ t('buttons.cancel') }}</span>
            </p>
        </section>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import useUserStore from '@/stores/user'

const { t } = useI18n()
const userStore = useUserStore()

userStore.checkRole(1, '/')
userStore.resetFlags()

const username = ref('')
const email = ref('')
const displayName = ref('')
const confirmDelete = ref(false)

function updateAccount() {
    if (!userStore.submitted) {
        userStore.updateAccount({ username: username.value, email: email.value, displayName: displayName.value })
    }
}
</script>