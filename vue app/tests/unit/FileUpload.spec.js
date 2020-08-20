import { expect } from 'chai';
import { mount } from "@vue/test-utils";
import Index from '@/components/Index.vue';

describe("FileUpload.vue Component Tests", () =>
{
    let wrapper;

    beforeEach(() =>
    {
        wrapper = mount(Index);
    });

    // it("Should render the File Explorer label with specific text", () =>
    // {
    //     const FindLabel = wrapper.find("label");

    //     expect(FindLabel).to.exist.to.not.be.empty;
    //     expect(FindLabel.isVisible()).to.be.true;
    //     expect(FindLabel.text()).to.be.equal("Upload picture:");
    // });

    it("Should render the File Explorer with a specific ID of (PictureUpload)", () =>
    {
        const FileExplorer = wrapper.find('input[type="file"]');
        expect(FileExplorer.attributes("id")).to.be.equal("PictureUpload").to.exist;
    });

    // to do more tests
    afterEach(() => { wrapper.destroy() });
});
