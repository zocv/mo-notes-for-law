import { defineConfig } from 'vitepress'
import { setAllSidebar } from './fans-tools/tools/autoSidebar'

export default defineConfig({
  title: "法律笔记",
  description: "A VitePress Site",
  base: '/mo-notes-for-law/',

  markdown: {

  },
  themeConfig: {
    base: '/mo-notes-for-law/',
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      // { text: 'Home', link: '/' },
      {
        text: '民事领域', items: [
          { text: '实务案例', link: '/repo/civil-law-cases/00 简述' },
          { text: '民法知识', link: '/repo/civil-law/00 简述' },
          { text: '法条库', link: '/repo/law-library/00 简述' }
        ]
      },
      {
        text: '刑事领域', items: [
          { text: '实务案例', link: '/repo/criminal-law-cases/00 简述' },
          { text: '刑法知识', link: '/repo/criminal-law/00 简述' },
          { text: '法条库', link: '/repo/law-library/00 简述' }
        ]
      },
      {
        text: '行政领域', items: [
          { text: '实务案例', link: '/repo/administrative-law-cases/00 简述' },
          { text: '行政法知识', link: '/repo/administrative-law/00 简述' },
          { text: '法条库', link: '/repo/law-library/00 简述' }
        ]
      },


    ],
    sidebar: setAllSidebar([
      ['/repo/civil-law-cases', 1],
      ['/repo/civil-law', 1],
      ['/repo/criminal-law-cases', 1],
      ['/repo/criminal-law', 1],

      ['/repo/law-library/001 民法典', 1],


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
