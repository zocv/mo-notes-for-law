import { defineConfig } from 'vitepress'
import { setAllSidebar } from './fans-tools/tools/autoSidebar'

export default defineConfig({
  title: "法律笔记",
  description: "A VitePress Site",
  markdown: {

  },
  themeConfig: {
    base: '/mo-notes-for-law/',
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      // { text: 'Home', link: '/' },
      {
        text: '民法', items: [
          { text: '知识库', link: '/repo/civil-law/00 简述' },
          { text: '法条库', link: '/repo/civil-law-provisions/00 简述' },
          { text: '案例库', link: '/repo/civil-law-cases/00 简述' }
        ]
      },
      { text: '民诉法', link: '/' },
      { text: '刑法', link: '/' },
      { text: '刑诉法', link: '/' },
      { text: '行政法', link: '/' },


    ],
    sidebar: setAllSidebar([
      ['/repo/civil-law-provisions', 1],
      ['/repo/civil-law-cases', 1],
      ['/repo/civil-law', 1],
    ]),
    outline: {
      label: "目录",
      // 因为要占用h1做网页副标题
      level: [2, 6],
    },



    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
