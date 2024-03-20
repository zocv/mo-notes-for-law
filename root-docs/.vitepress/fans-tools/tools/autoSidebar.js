import path from 'node:path'
import fs from 'node:fs'


/**
 * vitepress项目的根目录
 */
const root = path.resolve(__dirname, '../../..')

/**
 * 侧边栏中要忽略的文件或者目录
 */
const ignore_list = ['index.md', '.vitepress', 'node_modules', '.idea', 'assets', 'embedded_notes', 'xrepo']

// 判断是否是文件夹
const isDir = (path) => fs.lstatSync(path).isDirectory()


const process_filename = (momo) => {
    let res1 = momo.split('.md')[0]
    let res2 = res1.split(' ')[1]
    return res2
}

const process_filename_part = (momo) => {
    let res1 = momo.split('.md')[0]
    return res1
}


/**
 * 这是一个创造侧边栏的函数
 * @param {目标文件夹} dir_unprocessed 
 * @param {展开的层级} folder_level 
 */
export const create_sidebar = (dir_unprocessed, folder_level) => {

    // 获取完整路径
    const dir_path = path.join(root, dir_unprocessed)

    const files_all = fs.readdirSync(dir_path)


    const is_effective = (arr1, arr2) => Array.from(new Set(arr1.filter((item) => !new Set(arr2).has(item))))


    const files_effective = is_effective(files_all, ignore_list)

    const new_level = 0

    /**
     * 
     * @param {文件夹中的项目们} items 
     * @param {该文件夹的完整路径} repo_path 
     * @param {相对目录} dir_unprocessed 
     * @param {折叠的层级} folder_level 
     * @returns 
     */
    const create_list = (items, repo_path, dir_unprocessed, folder_level, now_level) => {
        const final_list = []


        for (let i = 0; i < items.length; i++) {
            const item = items[i]
            const item_path = path.join(repo_path, item)
            const isDir_res = isDir(item_path)
            if (isDir_res) {
                // 下级循环内容
                const new_items = fs.readdirSync(item_path)

                let dir_name_processed = process_filename(item)

                let new_floder = `${dir_unprocessed}/${item}`

                if (!now_level) {
                    now_level = 1
                }

                let next_level = now_level + 1


                let collapsed_state = Boolean

                if (now_level > folder_level) {
                    collapsed_state = true
                } else {
                    collapsed_state = false
                }



                final_list.push({
                    text: dir_name_processed,
                    collapsed: collapsed_state,
                    items: create_list(new_items, item_path, new_floder, folder_level, next_level),
                })


            } else {
                const file_name = path.basename(item_path)
                const file_ext = path.extname(item_path)
                if (file_ext !== '.md') {
                    continue
                }


                let file_name_processed = process_filename(file_name)

                let file_name_processed_part = process_filename_part(file_name)


                final_list.push({
                    text: file_name_processed,
                    link: `${dir_unprocessed}/${file_name}`
                })


            }
        }
        return final_list

    }

    return create_list(files_effective, dir_path, dir_unprocessed, folder_level, new_level)




}

export const setAllSidebar = (arr) => {
    let obj = {}

    for (let i = 0; i < arr.length; i++) {

        let repo = arr[i]

        let repo_name = repo[0]

        let level = repo[1]

        obj[repo_name] = create_sidebar(repo_name, level)


    }
    return obj

}


