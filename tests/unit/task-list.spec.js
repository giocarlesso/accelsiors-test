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
    test("tasks list should not be empty", () => {
        const component = wrapper.find("#table")
        expect(component.exists()).toBeTruthy()
    })

    test("check if tasks-list-item components is rendering", () => {
        const component = wrapper.findComponent(TasksListItem)
        expect(component.exists()).toBeTruthy()
    })
})
