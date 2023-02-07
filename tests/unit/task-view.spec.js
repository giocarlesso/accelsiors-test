import { shallowMount } from "@vue/test-utils"
import TaskView from "@/pages/TaskView"

describe("tasks-list", () => {
    const wrapper = shallowMount(TaskView, {
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
        const component = wrapper.find(".tasks-list")
        expect(component.exists()).toBeTruthy()
    })
})
