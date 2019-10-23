import waitUntil from "async-wait-until";
import { assert } from "chai";
import { configure, shallow } from "enzyme";
import React from "react";
import Adapter from "enzyme-adapter-react-16";
import fetch from "isomorphic-fetch";

import Legislations from "../src/components/Legislations";

configure({ adapter: new Adapter() });

describe("Legislations test", function() {
  let querystring = {
    search: "?page=1"
  };

  it("Legislations doesn't have any data at first render", function() {
    const root = shallow(<Legislations location={querystring} />);
    assert.equal(root.state("legislations").length, 0);
  });

  it("Legislations loads correctly from api", function(done) {
    const root = shallow(<Legislations location={querystring} />);
    waitUntil(() => root.state("legislations").length > 0).then(() => {
      assert.equal(root.state("legislations").length, 8);
      done();
    });
  });
});
