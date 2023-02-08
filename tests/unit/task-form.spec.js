import { shallowMount, RouterLinkStub } from "@vue/test-utils"
import TaskForm from "@/pages/TaskForm"

describe("task-form", () => {
    const wrapper = shallowMount(TaskForm, {
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

    test("page title should be Edit task", () => {
        const element = wrapper.find(".page-title")
        expect(element.text()).toBe("Edit task")
    })
})
