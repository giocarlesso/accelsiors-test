import { shallowMount } from "@vue/test-utils"
import TopBar from "@/components/TopBar"

describe("alert-notifications", () => {
    const wrapper = shallowMount(TopBar, {
        propsData: {
            title: "Task View",
        },
    })

    test("page title should be Edit task when props editForm is true", () => {
        const element = wrapper.find(".page-title")
        expect(element.text()).toBe("Task View")
    })

    test("check that one image is loaded", () => {
        const img = wrapper.findAll(".logo-image")
        expect(img.length).toBe(1)
    })

    test("check that the hr has a specific class", () => {
        const img = wrapper.find(".top-bar__separator")
        expect(img.exists()).toBeTruthy()
    })
})
