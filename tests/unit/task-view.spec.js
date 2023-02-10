import { mount, RouterLinkStub } from "@vue/test-utils"
import TaskView from "@/views/TaskView"

describe("task-view", () => {
    const wrapper = mount(TaskView, {
        mocks: {
            $route: {
                name: "TaskFormCreate",
            },
        },
        propsData: {
            tasks: [
                {
                    id: 1,
                    duration: 1.5,
                    date: "2019-05-11T00:00:00.000+0000",
                    activity: {
                        id: 1,
                        name: "Driving",
                    },
                    comment: "Lorem ipsum",
                },
            ],
        },
        stubs: {
            RouterLink: RouterLinkStub,
        },
    })
    test("tasks list should render if there are tasks", () => {
        const component = wrapper.find(".task-view")
        expect(component.exists()).toBeTruthy()
    })

    test("task-view__body should render is isLoading is false", async () => {
        await wrapper.setData({ isLoading: false })
        expect(wrapper.find(".task-view__body").isVisible()).toBeTruthy()
    })

    test("router-link should exist and it's text should be Create new task", async () => {
        await wrapper.setData({ isLoading: false })
        const component = wrapper.find(".link-button")

        expect(component.exists()).toBeTruthy()
        expect(component.text()).toBe("Create new task")
    })
})
