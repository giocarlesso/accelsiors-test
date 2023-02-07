import { createLocalVue, shallowMount, RouterLinkStub } from "@vue/test-utils"
import TasksListItem from "@/components/TasksListItem"
import { formatDate } from "@/filters"

describe("tasks-list-item", () => {
    const localVue = createLocalVue()

    localVue.filter("formatDate", formatDate)

    const wrapper = shallowMount(TasksListItem, {
        localVue,
        mocks: {
            $route: {
                params: {
                    task_id: 1,
                },
            },
        },
        propsData: {
            taskItem: {
                id: 1,
                date: "2019-05-11T00:00:00.000+0000",
                duration: 1.5,
                activity: {
                    id: 1,
                    name: "Driving",
                },
                comment: "Lorem ipsum",
            },
        },
        stubs: {
            RouterLink: RouterLinkStub,
        },
    })

    test("should render the component", () => {
        const component = wrapper.find(".row")
        expect(component.exists()).toBeTruthy()
    })

    test("router-link should contain the parameters", () => {
        const routerLink = wrapper.find(".link-button")
        expect(routerLink.vm.$route.params.task_id).toBe(1)
    })

    test("should render the date field correctly and formatted", () => {
        let date = wrapper.find(".date")
        expect(formatDate(date.text())).toBe("2019-05-11")
    })

    test("should render the duration field correctly and formatted", () => {
        let duration = wrapper.find(".duration")

        expect(duration.text()).toBe("1.5" + " hours")
    })

    test("should render the activity name field correctly", () => {
        let activity = wrapper.find(".activity")
        expect(activity.text()).toBe("Driving")
    })

    test("should render the comment field correctly", () => {
        let comment = wrapper.find(".comment")
        expect(comment.text()).toBe("Lorem ipsum")
    })
})
