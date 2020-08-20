import { expect } from 'chai';
import { mount } from "@vue/test-utils";
import Index from '@/components/Index.vue';
import LogoImage from '../../src/assets/no-gps.png';

describe("Index.vue Component Tests", () =>
{
    let wrapper;

    beforeEach(() =>
    {
        wrapper = mount(Index);
    });

    it("Should render the application Logo with a WIDTH and HEIGHT of 150", () =>
    {
        const FindLogo = wrapper.find("img");

        expect(FindLogo.attributes("alt")).to.be.equal("App Logo").and.to.not.be.empty;
        expect(FindLogo.attributes("src")).to.be.equal(LogoImage);
        expect(FindLogo.attributes("width")).to.be.equal("100");
        expect(FindLogo.attributes("height")).to.be.equal("100");
    });

    it("Should render H1 HTMLtag and not be empty", () =>
    {
        const H1Tag = wrapper.find("h1");

        expect(H1Tag.text()).to.be.equal("Picture Exif Remover (Remove GPS data from pictures)");
        expect(H1Tag).to.exist.to.not.be.empty;
    });

    afterEach(() => { wrapper.destroy() });
});
