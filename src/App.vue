<template>
    <div class="navbar">
        <div class="dropdown-toggle" :title="t('nav.titles.dropdown')">
            <img src="/images/dropdown.svg" width="40" height="40">
        </div>

        <a href="/">
            <div class="home" :title="t('nav.titles.home')">
                <img src="/images/home-icon-kgamex.svg">
            </div>
        </a>

        <a href="/activities" :title="t('nav.texts.activities')">
            <div class="submenu">
                <div class="icon">
                    <img src="/images/activities.svg" width="40" height="40">
                </div>

                <div class="text">
                    <p>{{ t("nav.texts.activities") }}</p>
                </div>
            </div>
        </a>

        <a href="/videos" :title="t('nav.texts.videos')">
            <div class="submenu">
                <div class="icon">
                    <img src="/images/videos.svg" width="40" height="40">
                </div>

                <div class="text">
                    <p>{{ t("nav.texts.videos") }}</p>
                </div>
            </div>
        </a>

        <a href="/blog" :title="t('nav.texts.blog')">
            <div class="submenu">
                <div class="icon">
                    <img src="/images/blog.svg" width="40" height="40">
                </div>

                <div class="text">
                    <p>{{ t("nav.texts.blog") }}</p>
                </div>
            </div>
        </a>

        <a href="/mini-games" :title="t('nav.texts.mini-games')">
            <div class="submenu">
                <div class="icon">
                    <img src="/images/mini-games.svg" width="40" height="40">
                </div>

                <div class="text">
                    <p>{{ t("nav.texts.mini-games") }}</p>
                </div>
            </div>
        </a>

        <a href="/tools" :title="t('nav.texts.tools')">
            <div class="submenu">
                <div class="icon">
                    <img src="/images/tools.svg" width="40" height="40">
                </div>

                <div class="text">
                    <p>{{ t("nav.texts.tools") }}</p>
                </div>
            </div>
        </a>

        <div v-if="false">
            <a href="/manage" :title="t('nav.texts.manage')">
                <div class="submenu">
                    <div class="icon">
                        <img src="/images/manage.svg" width="40" height="40">
                    </div>

                    <div class="text">
                        <p>{{ t("nav.texts.manage") }}</p>
                    </div>
                </div>
            </a>

            <a href="/account" :title="t('nav.texts.account')">
                <div class="submenu">
                    <div class="icon">
                        <img src="/images/account.svg" width="40" height="40">
                    </div>

                    <div class="text">
                        <p>{{ t("nav.texts.account") }}</p>
                    </div>
                </div>
            </a>

            <a href="/log-in" :title="t('nav.texts.log-in')">
                <div class="submenu">
                    <div class="icon">
                        <img src="/images/log-in.svg" width="40" height="40">
                    </div>

                    <div class="text">
                        <p>{{ t("nav.texts.log-in") }}</p>
                    </div>
                </div>
            </a>
        </div>

        <div id="change-language-button" class="submenu bottom" :title="t('nav.titles.language')">
            <div class="icon">
                <img src="/images/language.svg" width="40" height="40">
            </div>

            <div class="text">
                <p>{{ t("nav.texts.language") }}</p>
            </div>
        </div>
    </div>

    <transition name="fade-exp">
        <LanguageSelectWindow v-if="languageSelectWindowVisible" @close-language-select-window="languageSelectWindowVisible = false"/>
    </transition>

    <router-view />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

import LanguageSelectWindow from './components/LanguageSelectWindow.vue'

const { t } = useI18n()

let languageSelectWindowVisible = ref(false)

onMounted(() => {
    const navbar = document.getElementsByClassName('navbar')[0]
    const dropdownToggle = document.getElementsByClassName('dropdown-toggle')[0]
    const homeButton = document.getElementsByClassName('home')[0]
    const changeLanguageButton = document.getElementById('change-language-button')
    const coverBox = document.getElementsByClassName('cover-box')[0]

    dropdownToggle.addEventListener('click', () => {
        if (navbar.classList.contains('expanded')) {
            navbar.classList.remove('expanded')
            coverBox.classList.add('hidden')
        } else {
            navbar.classList.add('expanded')
            coverBox.classList.remove('hidden')
        }
    });

    homeButton.addEventListener('click', () => {
        if (navbar.classList.contains('expanded')) {
            navbar.classList.remove('expanded')
            coverBox.classList.add('hidden')
        }
    });

    changeLanguageButton.addEventListener('click', () => {
        languageSelectWindowVisible.value = !languageSelectWindowVisible.value
    });

    coverBox.addEventListener('click', () => {
        navbar.classList.remove('expanded')
        coverBox.classList.add('hidden')
    });
})
</script>