import { mount } from "@vue/test-utils"
import LoadingNotification from "@/components/LoadingNotification"

describe("alert-notifications", () => {
    const wrapper = mount(LoadingNotification, {
        propsData: {
            isLoading: true,
        },
    })

    test("should display notification", () => {
        const container = wrapper.find(".loading-notification")
        expect(container.exists()).toBeTruthy()
    })

    test("should have a div with class load", () => {
        const container = wrapper.find(".loading-notification")
        const loadDiv = container.find(".load")
        expect(loadDiv.classes("load")).toBeTruthy()
    })

    test("should not display loading", () => {
        const innerWrapper = mount(LoadingNotification, {
            propsData: {
                isLoading: false,
            },
        })
        const loadingDiv = innerWrapper.find(".loading-notification")
        expect(loadingDiv.exists()).toBeFalsy()
    })
})
