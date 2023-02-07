import { mount } from "@vue/test-utils"
import AlertNotifications from "@/components/AlertNotifications"

describe("alert-notifications", () => {
    const wrapper = mount(AlertNotifications, {
        propsData: {
            title: "Success",
            message: "Success message",
            alertType: "success",
            showAlert: true,
        },
    })

    const container = wrapper.find("div")

    test("should render the title prop correctly", () => {
        const title = wrapper.find(".title")
        expect(title.text()).toBe("Success")
    })

    test("should render the message prop correctly", () => {
        const message = wrapper.find(".message")
        expect(message.text()).toBe("Success message")
    })

    test('should add class "success" correctly', () => {
        expect(container.classes("success")).toBeTruthy()
    })

    test("should display notification", () => {
        expect(container.exists()).toBeTruthy()
    })

    test("should not display notification", () => {
        const innerWrapper = mount(AlertNotifications, {
            propsData: {
                title: "Error",
                message: "Error message",
                alertType: "error",
                showAlert: false,
            },
        })

        const container = innerWrapper.find("div")
        expect(container.exists()).toBeFalsy()
    })
})
