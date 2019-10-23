import waitUntil from "async-wait-until";
import { assert } from "chai";
import { configure, shallow } from "enzyme";
import React from "react";
import Adapter from "enzyme-adapter-react-16";
import fetch from "isomorphic-fetch";

import Representatives from "../src/components/Representatives";

configure({ adapter: new Adapter() });

describe("Representatives test", function() {
  let querystring = {
    search: "?page=1"
  };

  it("Representatives doesn't have any data at first render", function() {
    const root = shallow(<Representatives location={querystring} />);
    assert.equal(root.state("representatives").length, 0);
  });

  it("Representatives loads correctly from api", function(done) {
    const root = shallow(<Representatives location={querystring} />);
    waitUntil(() => root.state("representatives").length > 0).then(() => {
      assert.equal(root.state("representatives").length, 8);
      done();
    });
  });
});
