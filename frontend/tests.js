import waitUntil from "async-wait-until";
import { assert } from "chai";
import { configure, shallow } from "enzyme";
import React from "react";
import Adapter from "enzyme-adapter-react-16";
import fetch from "isomorphic-fetch";

import Districts from "./src/components/Districts";
import Legislations from "./src/components/Legislations";
import Representatives from "./src/components/Representatives";
import DistrictInstance from "./src/components/InstancePages/DistrictInstance";
import RepresentativeInstance from "./src/components/InstancePages/RepresentativeInstance";
import LegislationInstance from "./src/components/InstancePages/LegislationInstance";

configure({ adapter: new Adapter() });

describe("Districts test", function() {
  let querystring = {
    pathname: "/Districts",
    search: "?page=1"
  };

  it("Districts doesn't have any data at first render", function() {
    const root = shallow(<Districts location={querystring} />);
    assert.equal(root.state("districts").length, 0);
  });

  it("Districts loads correctly from api", function(done) {
    const root = shallow(<Districts location={querystring} />);
    waitUntil(() => root.state("districts").length > 0).then(() => {
      assert.equal(root.state("districts").length, 8);
      done();
    });
  });
});

describe("Legislations test", function() {
  let querystring = {
    pathname: "/Legislations",
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

describe("Representatives test", function() {
  let querystring = {
    pathname: "/Representatives",
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

describe("District Instance test", function() {
  const match = {
    params: {
      id: "1"
    }
  };
  it("District Instance page doesn't have any data at first render", function() {
    const root = shallow(<DistrictInstance match={match} />);
    assert.equal(root.state("district").id, null);
  });

  it("District Instance page loads correctly from api", function(done) {
    const root = shallow(<DistrictInstance match={match} />);
    waitUntil(() => root.state("district").id != null).then(() => {
      assert.equal(root.state("district").id, 1);
      assert.equal(root.state("district").state, "Alabama");
      assert.equal(root.state("district").congressional_district, "01");
      done();
    });
  });
});

describe("Representative Instance test", function() {
  const match = {
    params: {
      id: "F000467"
    }
  };
  it("Representative Instance page doesn't have any data at first render", function() {
    const root = shallow(<RepresentativeInstance match={match} />);
    assert.equal(root.state("representative").id, null);
  });

  it("Representative Instance page loads correctly from api", function(done) {
    const root = shallow(<RepresentativeInstance match={match} />);
    waitUntil(() => root.state("representative").id != null).then(() => {
      assert.equal(root.state("representative").id, "F000467");
      assert.equal(root.state("representative").full_name, "Abby Finkenauer");
      done();
    });
  });
});

describe("Legislation Instance test", function() {
  const match = {
    params: {
      id: "80"
    }
  };
  it("Legislation Instance page doesn't have any data at first render", function() {
    const root = shallow(<LegislationInstance match={match} />);
    assert.equal(root.state("legislation").id, null);
  });

  it("Legislation Instance page loads correctly from api", function(done) {
    const root = shallow(<LegislationInstance match={match} />);
    waitUntil(() => root.state("legislation").id != null).then(() => {
      assert.equal(root.state("legislation").id, "80");
      assert.equal(
        root.state("legislation").short_title,
        "Agriculture Improvement Act of 2018"
      );
      done();
    });
  });
});

describe("Searched Districts test", function() {
  let querystring = {
    pathname: "/Districts/search",
    search: "?page=1&attribute=texas"
  };

  it("Searched Districts don't have any data at first render", function() {
    const root = shallow(<Districts location={querystring} />);
    assert.equal(root.state("districts").length, 0);
  });

  it("Searched Districts load correctly from api", function(done) {
    const root = shallow(<Districts location={querystring} />);
    waitUntil(() => root.state("districts").length > 0).then(() => {
      assert.equal(root.state("districts").length, 8);
      assert.equal(root.state("districts")[0].id, "363");
      done();
    });
  });
});

describe("Sorted Districts test", function() {
  let querystring = {
    pathname: "/Districts/sort",
    search: "?page=1&attribute=population&order=ASC"
  };

  it("Sorted Districts don't have any data at first render", function() {
    const root = shallow(<Districts location={querystring} />);
    assert.equal(root.state("districts").length, 0);
  });

  it("Sorted Districts load correctly from api", function(done) {
    const root = shallow(<Districts location={querystring} />);
    waitUntil(() => root.state("districts").length > 0).then(() => {
      assert.equal(root.state("districts").length, 8);
      assert.equal(root.state("districts")[0].id, "345");
      done();
    });
  });
});

describe("Filtered Districts test", function() {
  let querystring = {
    pathname: "/Districts/filter",
    search: "?state=Washington"
  };

  it("Filtered Districts don't have any data at first render", function() {
    const root = shallow(<Districts location={querystring} />);
    assert.equal(root.state("districts").length, 0);
  });

  it("Filtered Districts load correctly from api", function(done) {
    const root = shallow(<Districts location={querystring} />);
    waitUntil(() => root.state("districts").length > 0).then(() => {
      assert.equal(root.state("districts").length, 8);
      assert.equal(root.state("districts")[0].id, "415");
      done();
    });
  });
});

describe("Searched Representatives test", function() {
  let querystring = {
    pathname: "/Representatives/search",
    search: "?attribute=adam"
  };

  it("Searched Representatives don't have any data at first render", function() {
    const root = shallow(<Representatives location={querystring} />);
    assert.equal(root.state("representatives").length, 0);
  });

  it("Searched Representatives load correctly from api", function(done) {
    const root = shallow(<Representatives location={querystring} />);
    waitUntil(() => root.state("representatives").length > 0).then(() => {
      assert.equal(root.state("representatives").length, 5);
      assert.equal(root.state("representatives")[0].id, "S001150");
      done();
    });
  });
});

describe("Sorted Representatives test", function() {
  let querystring = {
    pathname: "/Representatives/sort",
    search: "?page=1&attribute=seniority&order=DESC"
  };

  it("Sorted Representatives don't have any data at first render", function() {
    const root = shallow(<Representatives location={querystring} />);
    assert.equal(root.state("representatives").length, 0);
  });

  it("Sorted Representatives load correctly from api", function(done) {
    const root = shallow(<Representatives location={querystring} />);
    waitUntil(() => root.state("representatives").length > 0).then(() => {
      assert.equal(root.state("representatives").length, 8);
      assert.equal(root.state("representatives")[0].id, "Y000033");
      done();
    });
  });
});

describe("Filtered Representatives test", function() {
  let querystring = {
    pathname: "/Representatives/filter",
    search: "?page=1&party=R"
  };

  it("Filtered Representatives don't have any data at first render", function() {
    const root = shallow(<Representatives location={querystring} />);
    assert.equal(root.state("representatives").length, 0);
  });

  it("Filtered Representatives load correctly from api", function(done) {
    const root = shallow(<Representatives location={querystring} />);
    waitUntil(() => root.state("representatives").length > 0).then(() => {
      assert.equal(root.state("representatives").length, 8);
      assert.equal(root.state("representatives")[0].id, "K000378");
      done();
    });
  });
});

describe("Searched Legislations test", function() {
  let querystring = {
    pathname: "/Legislations/search",
    search: "?attribute=healthy"
  };

  it("Searched Legislations don't have any data at first render", function() {
    const root = shallow(<Legislations location={querystring} />);
    assert.equal(root.state("legislations").length, 0);
  });

  it("Searched Legislations load correctly from api", function(done) {
    const root = shallow(<Legislations location={querystring} />);
    waitUntil(() => root.state("legislations").length > 0).then(() => {
      assert.equal(root.state("legislations").length, 6);
      assert.equal(root.state("legislations")[0].id, "56");
      assert.equal(root.state("legislations")[0].short_title, "Healthy Food Access for All Americans Act");
      done();
    });
  });
});

describe("Sorted Legislations test", function() {
  let querystring = {
    pathname: "/Legislations/sort",
    search: "?page=1&attribute=introduced_date&order=ASC"
  };

  it("Sorted Legislations don't have any data at first render", function() {
    const root = shallow(<Legislations location={querystring} />);
    assert.equal(root.state("legislations").length, 0);
  });

  it("Sorted Legislations load correctly from api", function(done) {
    const root = shallow(<Legislations location={querystring} />);
    waitUntil(() => root.state("legislations").length > 0).then(() => {
      assert.equal(root.state("legislations").length, 8);
      assert.equal(root.state("legislations")[0].id, "82");
      done();
    });
  });
});

describe("Filtered Legislations test", function() {
  let querystring = {
    pathname: "/Legislations/filter",
    search: "?page=1&bill_type=hr"
  };

  it("Filtered Legislations don't have any data at first render", function() {
    const root = shallow(<Legislations location={querystring} />);
    assert.equal(root.state("legislations").length, 0);
  });

  it("Filtered Legislations load correctly from api", function(done) {
    const root = shallow(<Legislations location={querystring} />);
    waitUntil(() => root.state("legislations").length > 0).then(() => {
      assert.equal(root.state("legislations").length, 8);
      assert.equal(root.state("legislations")[0].id, "80");
      assert.equal(root.state("legislations")[0].short_title, "Agriculture Improvement Act of 2018");
      done();
    });
  });
});
