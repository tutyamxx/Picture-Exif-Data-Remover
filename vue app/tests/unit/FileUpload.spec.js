import { expect } from 'chai';
import { mount } from "@vue/test-utils";
import Index from '@/components/Index.vue';
import LogoImage from '../../src/assets/no-gps.png';

describe("FileUpload.vue Component Tests", () =>
{
    let wrapper;

    beforeEach(() =>
    {
        wrapper = mount(Index);
    });

    it("Should render the submission form with a specific ID of (Upload-Form)", () =>
    {
        const FindForm = wrapper.find("form");
        expect(FindForm.attributes("id")).to.be.equal("Upload-Form");
        expect(FindForm.exists()).to.be.true;
    });

    it("Should render the File Explorer with a specific ID of (PictureUpload)", () =>
    {
        const FileExplorer = wrapper.find('input[type="file"]');
        expect(FileExplorer.attributes("id")).to.be.equal("Picture-Upload");
        expect(FileExplorer.exists()).to.be.true;
    });

    it("Should not display any buttons if there is no file selected in File Explorer", () =>
    {
        const FileExplorer = wrapper.find('input[type="file"]');
        expect(FileExplorer.attributes("id")).to.be.equal("Picture-Upload").to.exist;
        FileExplorer.trigger("change");

        const FindUploadButton = wrapper.find("button");
        expect(FindUploadButton.exists()).to.be.false;
    });

    // to do more tests
    afterEach(() => { wrapper.destroy() });
});
