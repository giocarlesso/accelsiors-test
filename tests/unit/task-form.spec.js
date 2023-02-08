import { mount, RouterLinkStub } from "@vue/test-utils"
import TaskForm from "@/pages/TaskForm"
import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)
Vue.prototype.$store = new Vuex.Store()

describe("task-form", () => {
    const wrapper = mount(TaskForm, {
        propsData: {
            editForm: true,
            id: 1,
            duration: 1.5,
            date: "2019-05-11T00:00:00.000+0000",
            activity: {
                id: 1,
                name: "Driving",
            },
            comment: "Lorem ipsum",
        },
        stubs: {
            RouterLink: RouterLinkStub,
        },
    })
    test("component should render", () => {
        const component = wrapper.find(".task-form")
        expect(component.exists()).toBeTruthy()
    })

    // test("should render a text if there are no tasks", () => {
    //     let noTasksDiv = wrapper.find(".no-tasks")
    //     expect(noTasksDiv.text()).toBe("No tasks to show")
    // })

    // test("router-link should exist and contain specific parameters", () => {
    //     const routerLink = wrapper.find(".link-button")
    //     console.log(routerLink.vm.$route.name)
    //     expect(routerLink.vm.$route.name).toBe("TaskFormCreate")
    // })
})
