import { shallowMount } from "@vue/test-utils"
import TasksList from "@/components/TasksList.vue"
import TasksListItem from "@/components/TasksListItem.vue"

describe("tasks-list", () => {
    const wrapper = shallowMount(TasksList, {
        propsData: {
            tasks: [
                {
                    id: 1,
                    duration: 1.5,
                    date: "1990-01-01",
                    activity: {
                        id: 1,
                        name: "Driving",
                    },
                    comment: "Lorem ipsum",
                },
            ],
        },
    })
    test("tasks list should have a body if there are tasks", () => {
        const component = wrapper.find("#table")
        expect(component.find(".table-body")).toBeTruthy()
    })

    test("tasks-list-item component is rendering if there are tasks", () => {
        const component = wrapper.findComponent(TasksListItem)
        expect(component.exists()).toBeTruthy()
    })

    test("if there are no tasks, a message should show", async () => {
        const wrapper = shallowMount(TasksList, {
            propsData: {
                tasks: [],
            },
        })
        const component = wrapper.find(".table-body-empty")
        expect(component.text()).toBe("No tasks to show...")
    })
})
