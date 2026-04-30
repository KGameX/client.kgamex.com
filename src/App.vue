<template>
    <div class="navbar">
        <div class="dropdown-toggle" :title="t('nav.titles.dropdown')">
            <img src="/images/icons/dropdown.svg" width="40" height="40">
        </div>

        <router-link to="/">
            <div class="home" :title="t('nav.titles.home')">
                <img src="/images/home-icon-kgamex.svg">
            </div>
        </router-link>

        <router-link to="/videos" :title="t('nav.texts.videos')">
            <div class="submenu">
                <div class="icon">
                    <img src="/images/icons/videos.svg" width="40" height="40">
                </div>

                <div class="text">
                    <p>{{ t('nav.texts.videos') }}</p>
                </div>
            </div>
        </router-link>

        <router-link to="/questions" :title="t('nav.texts.questions')">
            <div class="submenu">
                <div class="icon">
                    <img src="/images/icons/questions.svg" width="40" height="40">
                </div>

                <div class="text">
                    <p>{{ t('nav.texts.questions') }}</p>
                </div>
            </div>
        </router-link>

        <router-link to="/logout" :title="t('nav.texts.logout')" v-if="userStore.user">
            <div class="submenu">
                <div class="icon">
                    <img src="/images/icons/account.svg" width="40" height="40">
                </div>

                <div class="text">
                    <p>{{ userStore.user.display_name }}</p>
                </div>
            </div>
        </router-link>

        <router-link to="/login" :title="t('nav.texts.login')" v-else>
            <div class="submenu">
                <div class="icon">
                    <img src="/images/icons/log-in.svg" width="40" height="40">
                </div>

                <div class="text">
                    <p>{{ t('nav.texts.login') }}</p>
                </div>
            </div>
        </router-link>

        <div v-if="false">
            <router-link to="/activities" :title="t('nav.texts.activities')">
                <div class="submenu">
                    <div class="icon">
                        <img src="/images/icons/activities.svg" width="40" height="40">
                    </div>

                    <div class="text">
                        <p>{{ t('nav.texts.activities') }}</p>
                    </div>
                </div>
            </router-link>

            <router-link to="/blog" :title="t('nav.texts.blog')">
                <div class="submenu">
                    <div class="icon">
                        <img src="/images/icons/blog.svg" width="40" height="40">
                    </div>

                    <div class="text">
                        <p>{{ t('nav.texts.blog') }}</p>
                    </div>
                </div>
            </router-link>

            <router-link to="/mini-games" :title="t('nav.texts.mini-games')">
                <div class="submenu">
                    <div class="icon">
                        <img src="/images/icons/mini-games.svg" width="40" height="40">
                    </div>

                    <div class="text">
                        <p>{{ t('nav.texts.mini-games') }}</p>
                    </div>
                </div>
            </router-link>

            <router-link to="/tools" :title="t('nav.texts.tools')">
                <div class="submenu">
                    <div class="icon">
                        <img src="/images/icons/tools.svg" width="40" height="40">
                    </div>

                    <div class="text">
                        <p>{{ t('nav.texts.tools') }}</p>
                    </div>
                </div>
            </router-link>

            <router-link to="/manage" :title="t('nav.texts.manage')">
                <div class="submenu">
                    <div class="icon">
                        <img src="/images/icons/manage.svg" width="40" height="40">
                    </div>

                    <div class="text">
                        <p>{{ t('nav.texts.manage') }}</p>
                    </div>
                </div>
            </router-link>
        </div>

        <div id="change-language-button" class="submenu bottom" :title="t('nav.titles.language')">
            <div class="icon">
                <img src="/images/icons/language.svg" width="40" height="40">
            </div>

            <div class="text">
                <p>{{ t('nav.texts.language') }}</p>
            </div>
        </div>
    </div>

    <transition name="lsw-fade">
        <LanguageSelectWindow v-if="languageSelectWindowVisible" @close-language-select-window="languageSelectWindowVisible = false"/>
    </transition>

    <router-view v-slot="{ Component }">
        <Transition name="page-fade" mode="out-in">
            <component :is="Component" />
        </Transition>
    </router-view>

    <div class="cover-box hidden"></div>

    <div class="footer">
        <div>
            <p>{{ year }} KGΛMΞX - Live it, for Real.</p>
        </div>
    
        <div>
            <ul>
                <li><a href="https://discord.com/invite/uDsPdw7A5r" target="_blank"><img src="/images/socials-symbolic/discord.svg" height="30" id="icon"></a></li>
                <li><a href="https://youtube.com/@kgamex_vk" target="_blank"><img src="/images/socials-symbolic/youtube.svg" height="30" id="icon"></a></li>
                <li><a href="https://github.com/KGameX/client.kgamex.com" target="_blank"><img src="/images/socials-symbolic/github.svg" height="30" id="icon"></a></li>
                <li><a href="https://facebook.com/KGameX.VK" target="_blank"><img src="/images/socials-symbolic/facebook.svg" height="30" id="icon"></a></li>
                <li><a href="https://instagram.com/KGameX.VK" target="_blank"><img src="/images/socials-symbolic/instagram.svg" height="30" id="icon"></a></li>
                <li><a href="https://x.com/KGameX_VK" target="_blank"><img src="/images/socials-symbolic/x.svg" height="30" id="icon"></a></li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import LanguageSelectWindow from './components/LanguageSelectWindow.vue'
import useUserStore from '@/stores/user'
import useLocaleStore from '@/stores/locale'
import useUptimeStore from '@/stores/uptime'

const { t } = useI18n()
const year = new Date().getFullYear()
const languageSelectWindowVisible = ref(false)
const userStore = useUserStore()
const localeStore = useLocaleStore()
const uptimeStore = useUptimeStore()

userStore.renewAuth()
uptimeStore.fetchUptime()
uptimeStore.fetchDayOfLaunch()

onMounted(() => {
    const navbar = document.getElementsByClassName('navbar')[0]
    const dropdownToggle = document.getElementsByClassName('dropdown-toggle')[0]
    const submenus = document.getElementsByClassName('submenu')
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
    })

    Array.from(submenus).slice(0, -1).forEach((submenu) => {
        submenu.addEventListener('click', () => {
            if (navbar.classList.contains('expanded')) {
                navbar.classList.remove('expanded')
                coverBox.classList.add('hidden')
            }
        })
    })

    changeLanguageButton.addEventListener('click', () => {
        languageSelectWindowVisible.value = !languageSelectWindowVisible.value
    })

    coverBox.addEventListener('click', () => {
        navbar.classList.remove('expanded')
        coverBox.classList.add('hidden')
    })
})
</script>