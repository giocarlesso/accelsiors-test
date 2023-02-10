import { shallowMount, RouterLinkStub, createLocalVue } from "@vue/test-utils"
import TaskForm from "@/views/TaskForm"
import Vue from "vue"
import router from "@/router/index"
import { formatDate } from "@/filters"
import activities from "@/services/activities"

const mockActivitiesList = [
    { id: 1, name: "Driving" },
    { id: 2, name: "Fishing" },
]

jest.spyOn(activities, "listActivities").mockResolvedValue(mockActivitiesList)

Vue.use(router)

describe("task-form", () => {
    const localVue = createLocalVue()

    localVue.filter("formatDate", formatDate)

    const wrapper = shallowMount(TaskForm, {
        propsData: {
            editForm: true,
        },
        stubs: {
            RouterLink: RouterLinkStub,
        },
    })
    test("component should render", () => {
        const component = wrapper.find(".task-form")
        expect(component.exists()).toBeTruthy()
    })

    test("set the value of input date element", async () => {
        const datePicker = wrapper.find(".date")
        await datePicker.setValue(formatDate("2019-05-11T00:00:00.000+0000"))

        expect(wrapper.find(".date").element.value).toEqual(
            formatDate("2019-05-11T00:00:00.000+0000")
        )
    })

    test("set the value of input duration element", async () => {
        const duration = wrapper.find(".duration")
        await duration.setValue(1.5)

        expect(wrapper.find(".duration").element.value).toStrictEqual("1.5")
    })

    test("should call the listActivities method", () => {
        activities.listActivities().then(data => {
            expect(data).toEqual(mockActivitiesList)
        })
    })

    test("check the value from the select's first option element", async () => {
        const options = wrapper.findAll("option")

        await options.at(0).setSelected()

        expect(options.at(0).element.value).toBe("select")
    })

    test("set the value of comment element", async () => {
        const commentInput = wrapper.find(".comment")
        await commentInput.setValue("Lorem ipsum")

        expect(wrapper.find(".comment").element.value).toBe("Lorem ipsum")
    })

    test("router-link should exist and contain a specific text", () => {
        const routerLink = wrapper.find(".link-button")
        expect(routerLink.text()).toBe("Cancel")
    })

    test("submit button's text should be Save task when prop editForm is true", () => {
        const element = wrapper.find(".submit-button")
        expect(element.text()).toBe("Save task")
    })

    test("submit button's text should be Create task when prop editForm is false", async () => {
        const innerWrapper = shallowMount(TaskForm, {
            propsData: {
                editForm: false,
            },
        })
        await innerWrapper.setData({ isLoading: false })

        const element = innerWrapper.find(".submit-button")
        expect(element.text()).toBe("Create task")
    })
})
