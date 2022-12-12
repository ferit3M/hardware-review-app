import { HardwareComponent } from "./hardware-component"

export interface HardwareCategory {
    endpoint: string,
    category: string,
    components: HardwareComponent[]
}
