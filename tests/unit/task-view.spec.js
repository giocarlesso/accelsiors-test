import { mount, RouterLinkStub } from "@vue/test-utils"
import TaskView from "@/pages/TaskView"

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

    test("should render a text if there are no tasks", () => {
        let noTasksDiv = wrapper.find(".no-tasks")
        expect(noTasksDiv.text()).toBe("No tasks to show")
    })

    test("router-link should exist and contain specific parameters", () => {
        const routerLink = wrapper.find(".link-button")
        console.log(routerLink.vm.$route.name)
        expect(routerLink.vm.$route.name).toBe("TaskFormCreate")
    })
})
